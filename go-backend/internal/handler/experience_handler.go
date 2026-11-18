package handler

import (
	"encoding/json"
	"errors"
	"log"
	"net/http"
	"strconv"

	"github.com/azuhalz/my-portfolio/go-backend/internal/model"
	"github.com/azuhalz/my-portfolio/go-backend/internal/service"
	"github.com/jackc/pgx/v5"
)

type ExperienceHandler struct {
	service *service.ExperienceService
}

func NewExperienceHandler(service *service.ExperienceService) *ExperienceHandler {
	return &ExperienceHandler{
		service: service,
	}
}

func (h *ExperienceHandler) GetAll(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	experienceType := r.URL.Query().Get("type")

	experiences, err := h.service.GetAll(r.Context(), experienceType)
	if err != nil {
		var validationErr *service.ValidationError

		if errors.As(err, &validationErr) {
			writeJSONError(w, http.StatusBadRequest, validationErr.Error())
			return
		}

		log.Printf("Failed to get experiences: %v", err)
		writeJSONError(w, http.StatusInternalServerError, "Internal server error")
		return
	}

	if err := json.NewEncoder(w).Encode(experiences); err != nil {
		log.Printf("Failed to encode experiences: %v", err)
	}
}

func (h *ExperienceHandler) GetByID(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	id, err := parseExperienceID(r)
	if err != nil {
		writeJSONError(w, http.StatusBadRequest, "Invalid experience ID")
		return
	}

	experience, err := h.service.GetByID(r.Context(), id)
	if err != nil {
		var validationErr *service.ValidationError

		if errors.As(err, &validationErr) {
			writeJSONError(w, http.StatusBadRequest, validationErr.Error())
			return
		}

		if errors.Is(err, pgx.ErrNoRows) {
			writeJSONError(w, http.StatusNotFound, "Experience not found")
			return
		}

		log.Printf("Failed to get experience: %v", err)
		writeJSONError(w, http.StatusInternalServerError, "Internal server error")
		return
	}

	if err := json.NewEncoder(w).Encode(experience); err != nil {
		log.Printf("Failed to encode experience: %v", err)
	}
}

func (h *ExperienceHandler) Create(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var request model.CreateExperienceRequest

	if err := decodeJSON(r, &request); err != nil {
		writeJSONError(w, http.StatusBadRequest, "Invalid JSON request")
		return
	}

	experience, err := h.service.Create(r.Context(), request)
	if err != nil {
		var validationErr *service.ValidationError

		if errors.As(err, &validationErr) {
			writeJSONError(w, http.StatusBadRequest, validationErr.Error())
			return
		}

		log.Printf("Failed to create experience: %v", err)
		writeJSONError(w, http.StatusInternalServerError, "Internal server error")
		return
	}

	w.WriteHeader(http.StatusCreated)

	if err := json.NewEncoder(w).Encode(experience); err != nil {
		log.Printf("Failed to encode created experience: %v", err)
	}
}

func (h *ExperienceHandler) Update(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	id, err := parseExperienceID(r)
	if err != nil {
		writeJSONError(w, http.StatusBadRequest, "Invalid experience ID")
		return
	}

	var request model.UpdateExperienceRequest

	if err := decodeJSON(r, &request); err != nil {
		writeJSONError(w, http.StatusBadRequest, "Invalid JSON request")
		return
	}

	experience, err := h.service.Update(r.Context(), id, request)
	if err != nil {
		var validationErr *service.ValidationError

		if errors.As(err, &validationErr) {
			writeJSONError(w, http.StatusBadRequest, validationErr.Error())
			return
		}

		if errors.Is(err, pgx.ErrNoRows) {
			writeJSONError(w, http.StatusNotFound, "Experience not found")
			return
		}

		log.Printf("Failed to update experience: %v", err)
		writeJSONError(w, http.StatusInternalServerError, "Internal server error")
		return
	}

	if err := json.NewEncoder(w).Encode(experience); err != nil {
		log.Printf("Failed to encode updated experience: %v", err)
	}
}

func (h *ExperienceHandler) Delete(w http.ResponseWriter, r *http.Request) {
	id, err := parseExperienceID(r)
	if err != nil {
		writeJSONError(w, http.StatusBadRequest, "Invalid experience ID")
		return
	}

	err = h.service.Delete(r.Context(), id)
	if err != nil {
		var validationErr *service.ValidationError

		if errors.As(err, &validationErr) {
			writeJSONError(w, http.StatusBadRequest, validationErr.Error())
			return
		}

		if errors.Is(err, pgx.ErrNoRows) {
			writeJSONError(w, http.StatusNotFound, "Experience not found")
			return
		}

		log.Printf("Failed to delete experience: %v", err)
		writeJSONError(w, http.StatusInternalServerError, "Internal server error")
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

func parseExperienceID(r *http.Request) (int16, error) {
	id, err := strconv.ParseInt(r.PathValue("id"), 10, 16)
	if err != nil {
		return 0, err
	}

	return int16(id), nil
}
