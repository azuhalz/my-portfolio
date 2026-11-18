package handler

import (
	"encoding/json"
	"errors"
	"net/http"
	"strconv"

	"github.com/azuhalz/my-portfolio/go-backend/internal/model"
	"github.com/azuhalz/my-portfolio/go-backend/internal/service"
	"github.com/jackc/pgx/v5"
)

type CertificationHandler struct {
	service *service.CertificationService
}

func NewCertificationHandler(service *service.CertificationService) *CertificationHandler {
	return &CertificationHandler{
		service: service,
	}
}

func (h *CertificationHandler) GetAll(w http.ResponseWriter, r *http.Request) {
	certifications, err := h.service.GetAll(r.Context())
	if err != nil {
		writeJSONError(w, http.StatusInternalServerError, "failed to get certifications")
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(certifications)
}

func (h *CertificationHandler) GetByID(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.ParseInt(r.PathValue("id"), 10, 16)
	if err != nil {
		writeJSONError(w, http.StatusBadRequest, "invalid certification ID")
		return
	}

	certification, err := h.service.GetByID(r.Context(), int16(id))
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			writeJSONError(w, http.StatusNotFound, "certification not found")
			return
		}

		writeJSONError(w, http.StatusInternalServerError, "failed to get certification")
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(certification)
}

func (h *CertificationHandler) Create(w http.ResponseWriter, r *http.Request) {
	var request model.CreateCertificationRequest

	if err := decodeJSON(r, &request); err != nil {
		writeJSONError(w, http.StatusBadRequest, "invalid request body")
		return
	}

	certification, err := h.service.Create(r.Context(), request)
	if err != nil {
		if errors.Is(err, service.ErrInvalidCertification) {
			writeJSONError(w, http.StatusBadRequest, err.Error())
			return
		}

		writeJSONError(w, http.StatusInternalServerError, "failed to create certification")
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(certification)
}

func (h *CertificationHandler) Update(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.ParseInt(r.PathValue("id"), 10, 16)
	if err != nil {
		writeJSONError(w, http.StatusBadRequest, "invalid certification ID")
		return
	}

	var request model.UpdateCertificationRequest

	if err := decodeJSON(r, &request); err != nil {
		writeJSONError(w, http.StatusBadRequest, "invalid request body")
		return
	}

	certification, err := h.service.Update(r.Context(), int16(id), request)
	if err != nil {
		if errors.Is(err, service.ErrInvalidCertification) {
			writeJSONError(w, http.StatusBadRequest, err.Error())
			return
		}

		if errors.Is(err, pgx.ErrNoRows) {
			writeJSONError(w, http.StatusNotFound, "certification not found")
			return
		}

		writeJSONError(w, http.StatusInternalServerError, "failed to update certification")
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(certification)
}

func (h *CertificationHandler) Delete(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.ParseInt(r.PathValue("id"), 10, 16)
	if err != nil {
		writeJSONError(w, http.StatusBadRequest, "invalid certification ID")
		return
	}

	err = h.service.Delete(r.Context(), int16(id))
	if err != nil {
		if errors.Is(err, service.ErrInvalidCertification) {
			writeJSONError(w, http.StatusBadRequest, err.Error())
			return
		}

		if errors.Is(err, pgx.ErrNoRows) {
			writeJSONError(w, http.StatusNotFound, "certification not found")
			return
		}

		writeJSONError(w, http.StatusInternalServerError, "failed to delete certification")
		return
	}

	w.WriteHeader(http.StatusNoContent)
}
