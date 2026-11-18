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

type EducationHandler struct {
	service *service.EducationService
}

func NewEducationHandler(service *service.EducationService) *EducationHandler {
	return &EducationHandler{
		service: service,
	}
}

func (h *EducationHandler) GetAll(w http.ResponseWriter, r *http.Request) {
	educations, err := h.service.GetAll(r.Context())
	if err != nil {
		writeJSONError(w, http.StatusInternalServerError, "Internal server error")
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(educations)
}

func (h *EducationHandler) GetByID(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.ParseInt(r.PathValue("id"), 10, 16)
	if err != nil || id <= 0 {
		writeJSONError(w, http.StatusBadRequest, "Invalid education ID")
		return
	}

	education, err := h.service.GetByID(r.Context(), int16(id))
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			writeJSONError(w, http.StatusNotFound, "Education not found")
			return
		}

		if errors.Is(err, service.ErrInvalidEducation) {
			writeJSONError(w, http.StatusBadRequest, "Invalid education data")
			return
		}

		writeJSONError(w, http.StatusInternalServerError, "Internal server error")
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(education)
}

func (h *EducationHandler) Create(w http.ResponseWriter, r *http.Request) {
	var request model.CreateEducationRequest

	if err := decodeJSON(r, &request); err != nil {
		writeJSONError(w, http.StatusBadRequest, "Invalid request body")
		return
	}

	education, err := h.service.Create(r.Context(), request)
	if err != nil {
		if errors.Is(err, service.ErrInvalidEducation) {
			writeJSONError(w, http.StatusBadRequest, "Invalid education data")
			return
		}

		writeJSONError(w, http.StatusInternalServerError, "Internal server error")
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(education)
}

func (h *EducationHandler) Update(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.ParseInt(r.PathValue("id"), 10, 16)
	if err != nil || id <= 0 {
		writeJSONError(w, http.StatusBadRequest, "Invalid education ID")
		return
	}

	var request model.UpdateEducationRequest

	if err := decodeJSON(r, &request); err != nil {
		writeJSONError(w, http.StatusBadRequest, "Invalid request body")
		return
	}

	education, err := h.service.Update(r.Context(), int16(id), request)
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			writeJSONError(w, http.StatusNotFound, "Education not found")
			return
		}

		if errors.Is(err, service.ErrInvalidEducation) {
			writeJSONError(w, http.StatusBadRequest, "Invalid education data")
			return
		}

		writeJSONError(w, http.StatusInternalServerError, "Internal server error")
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(education)
}

func (h *EducationHandler) Delete(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.ParseInt(r.PathValue("id"), 10, 16)
	if err != nil || id <= 0 {
		writeJSONError(w, http.StatusBadRequest, "Invalid education ID")
		return
	}

	err = h.service.Delete(r.Context(), int16(id))
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			writeJSONError(w, http.StatusNotFound, "Education not found")
			return
		}

		if errors.Is(err, service.ErrInvalidEducation) {
			writeJSONError(w, http.StatusBadRequest, "Invalid education data")
			return
		}

		writeJSONError(w, http.StatusInternalServerError, "Internal server error")
		return
	}

	w.WriteHeader(http.StatusNoContent)
}
