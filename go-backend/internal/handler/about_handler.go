package handler

import (
	"encoding/json"
	"errors"
	"log"
	"net/http"

	"github.com/azuhalz/my-portfolio/go-backend/internal/model"
	"github.com/azuhalz/my-portfolio/go-backend/internal/service"
	"github.com/jackc/pgx/v5"
)

type AboutHandler struct {
	service *service.AboutService
}

func NewAboutHandler(aboutService *service.AboutService) *AboutHandler {
	return &AboutHandler{
		service: aboutService,
	}
}

func (h *AboutHandler) Get(w http.ResponseWriter, r *http.Request) {
	about, err := h.service.Get(r.Context())
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			writeJSONError(w, http.StatusNotFound, "about not found")
			return
		}

		log.Printf("Failed to get about: %v", err)
		writeJSONError(w, http.StatusInternalServerError, "internal server error")
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)

	if err := json.NewEncoder(w).Encode(about); err != nil {
		log.Printf("Failed to encode about response: %v", err)
	}
}

func (h *AboutHandler) Update(w http.ResponseWriter, r *http.Request) {
	var request model.UpdateAboutRequest

	if err := decodeJSON(r, &request); err != nil {
		writeJSONError(w, http.StatusBadRequest, "invalid JSON request")
		return
	}

	about, err := h.service.Update(r.Context(), request)
	if err != nil {
		var validationErr *service.ValidationError

		if errors.As(err, &validationErr) {
			writeJSONError(w, http.StatusBadRequest, validationErr.Message)
			return
		}

		if errors.Is(err, pgx.ErrNoRows) {
			writeJSONError(w, http.StatusNotFound, "about not found")
			return
		}

		log.Printf("Failed to update about: %v", err)
		writeJSONError(w, http.StatusInternalServerError, "internal server error")
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)

	if err := json.NewEncoder(w).Encode(about); err != nil {
		log.Printf("Failed to encode about response: %v", err)
	}
}
