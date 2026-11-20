package handler

import (
	"errors"
	"io"
	"log"
	"net/http"
	"strconv"

	"github.com/azuhalz/my-portfolio/go-backend/internal/service"
	"github.com/jackc/pgx/v5"
)

type ProjectImageHandler struct {
	service *service.ProjectImageService
}

func NewProjectImageHandler(
	service *service.ProjectImageService,
) *ProjectImageHandler {
	return &ProjectImageHandler{
		service: service,
	}
}

func (h *ProjectImageHandler) Upload(w http.ResponseWriter, r *http.Request) {
	slug := r.PathValue("slug")

	r.Body = http.MaxBytesReader(w, r.Body, service.MaxProjectImageSize)

	if err := r.ParseMultipartForm(service.MaxProjectImageSize); err != nil {
		writeJSONError(w, http.StatusBadRequest, "Invalid image upload or file too large")
		return
	}

	file, header, err := r.FormFile("image")
	if err != nil {
		writeJSONError(w, http.StatusBadRequest, "Image file is required")
		return
	}
	defer file.Close()

	imageData, err := io.ReadAll(file)
	if err != nil {
		writeJSONError(w, http.StatusBadRequest, "Failed to read image")
		return
	}

	var sortOrder int16

	if value := r.FormValue("sort_order"); value != "" {
		parsed, err := strconv.ParseInt(value, 10, 16)
		if err != nil || parsed < 0 {
			writeJSONError(w, http.StatusBadRequest, "Invalid sort order")
			return
		}

		sortOrder = int16(parsed)
	}

	image, err := h.service.Upload(
		r.Context(),
		slug,
		imageData,
		header.Filename,
		sortOrder,
	)
	if err != nil {
		if errors.Is(err, service.ErrInvalidProjectImage) {
			writeJSONError(w, http.StatusBadRequest, "Invalid image. Use JPEG, PNG, or WebP up to 5 MB")
			return
		}

		if errors.Is(err, pgx.ErrNoRows) {
			writeJSONError(w, http.StatusNotFound, "Project not found")
			return
		}

		log.Printf("Failed to upload project image: %v", err)
		writeJSONError(w, http.StatusInternalServerError, "Internal server error")
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)

	if err := writeJSON(w, image); err != nil {
		log.Printf("Failed to encode project image: %v", err)
	}
}

func (h *ProjectImageHandler) GetByID(w http.ResponseWriter, r *http.Request) {
	slug := r.PathValue("slug")

	imageID, err := strconv.ParseInt(r.PathValue("id"), 10, 16)
	if err != nil || imageID <= 0 {
		writeJSONError(w, http.StatusBadRequest, "Invalid image ID")
		return
	}

	image, err := h.service.GetByID(
		r.Context(),
		slug,
		int16(imageID),
	)
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			http.NotFound(w, r)
			return
		}

		log.Printf("Failed to get project image: %v", err)
		writeJSONError(w, http.StatusInternalServerError, "Internal server error")
		return
	}

	w.Header().Set("Content-Type", image.MimeType)
	w.Header().Set("X-Content-Type-Options", "nosniff")
	w.Header().Set("Cache-Control", "public, max-age=31536000, immutable")

	w.WriteHeader(http.StatusOK)

	if _, err := w.Write(image.ImageData); err != nil {
		log.Printf("Failed to write project image: %v", err)
	}
}

func (h *ProjectImageHandler) Delete(w http.ResponseWriter, r *http.Request) {
	slug := r.PathValue("slug")

	imageID, err := strconv.ParseInt(r.PathValue("id"), 10, 16)
	if err != nil || imageID <= 0 {
		writeJSONError(w, http.StatusBadRequest, "Invalid image ID")
		return
	}

	err = h.service.Delete(
		r.Context(),
		slug,
		int16(imageID),
	)
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			writeJSONError(w, http.StatusNotFound, "Project image not found")
			return
		}

		log.Printf("Failed to delete project image: %v", err)
		writeJSONError(w, http.StatusInternalServerError, "Internal server error")
		return
	}

	w.WriteHeader(http.StatusNoContent)
}
