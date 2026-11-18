package handler

import (
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"mime"
	"net/http"
	"path/filepath"
	"strings"

	"github.com/azuhalz/my-portfolio/go-backend/internal/model"
	"github.com/azuhalz/my-portfolio/go-backend/internal/service"
	"github.com/jackc/pgx/v5"
)

const maxCVSize = 10 << 20 // 10 MB

type ContactHandler struct {
	service *service.ContactService
}

func NewContactHandler(service *service.ContactService) *ContactHandler {
	return &ContactHandler{
		service: service,
	}
}

func (h *ContactHandler) GetContact(w http.ResponseWriter, r *http.Request) {
	contact, err := h.service.GetContact(r.Context())
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			contactWriteJSONError(w, http.StatusNotFound, "contact not found")
			return
		}

		contactWriteJSONError(w, http.StatusInternalServerError, "failed to get contact")
		return
	}

	contactWriteJSON(w, http.StatusOK, contact)
}

func (h *ContactHandler) UpdateContact(w http.ResponseWriter, r *http.Request) {
	var request model.UpdateContactRequest

	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		contactWriteJSONError(w, http.StatusBadRequest, "invalid request body")
		return
	}

	contact, err := h.service.UpdateContact(r.Context(), request)
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			contactWriteJSONError(w, http.StatusNotFound, "contact not found")
			return
		}

		contactWriteJSONError(w, http.StatusInternalServerError, "failed to update contact")
		return
	}

	contactWriteJSON(w, http.StatusOK, contact)
}

func (h *ContactHandler) UploadCV(w http.ResponseWriter, r *http.Request) {
	r.Body = http.MaxBytesReader(w, r.Body, maxCVSize+(1<<20))

	if err := r.ParseMultipartForm(maxCVSize); err != nil {
		contactWriteJSONError(w, http.StatusBadRequest, "invalid or oversized file")
		return
	}

	file, fileHeader, err := r.FormFile("file")
	if err != nil {
		contactWriteJSONError(w, http.StatusBadRequest, "CV file is required")
		return
	}
	defer file.Close()

	if fileHeader.Size > maxCVSize {
		contactWriteJSONError(w, http.StatusBadRequest, "file size must not exceed 10MB")
		return
	}

	fileName := filepath.Base(fileHeader.Filename)

	if !strings.EqualFold(filepath.Ext(fileName), ".pdf") {
		contactWriteJSONError(w, http.StatusBadRequest, "only PDF files are allowed")
		return
	}

	data, err := io.ReadAll(io.LimitReader(file, maxCVSize+1))
	if err != nil {
		contactWriteJSONError(w, http.StatusBadRequest, "failed to read CV file")
		return
	}

	if len(data) > maxCVSize {
		contactWriteJSONError(w, http.StatusBadRequest, "file size must not exceed 10MB")
		return
	}

	contentType := http.DetectContentType(data)

	if !strings.HasPrefix(contentType, "application/pdf") ||
		!strings.HasPrefix(string(data), "%PDF-") {
		contactWriteJSONError(w, http.StatusBadRequest, "invalid PDF file")
		return
	}

	request := model.UploadCVRequest{
		FileName:    fileName,
		ContentType: "application/pdf",
		Data:        data,
	}

	if err := h.service.UploadCV(r.Context(), request); err != nil {
		contactWriteJSONError(w, http.StatusInternalServerError, "failed to upload CV")
		return
	}

	contactWriteJSON(w, http.StatusOK, map[string]string{
		"message":   "CV uploaded successfully",
		"file_name": fileName,
	})
}

func (h *ContactHandler) GetCV(w http.ResponseWriter, r *http.Request) {
	cv, err := h.service.GetCV(r.Context())
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			contactWriteJSONError(w, http.StatusNotFound, "CV not found")
			return
		}

		contactWriteJSONError(w, http.StatusInternalServerError, "failed to get CV")
		return
	}

	if len(cv.Data) == 0 {
		contactWriteJSONError(w, http.StatusNotFound, "CV not found")
		return
	}

	fileName := filepath.Base(cv.FileName)
	disposition := mime.FormatMediaType("attachment", map[string]string{
		"filename": fileName,
	})

	w.Header().Set("Content-Type", "application/pdf")
	w.Header().Set("Content-Disposition", disposition)
	w.Header().Set("Content-Length", fmt.Sprintf("%d", len(cv.Data)))
	w.WriteHeader(http.StatusOK)

	_, _ = w.Write(cv.Data)
}

func contactWriteJSON(w http.ResponseWriter, status int, data any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(data)
}

func contactWriteJSONError(w http.ResponseWriter, status int, message string) {
	contactWriteJSON(w, status, map[string]string{
		"error": message,
	})
}
