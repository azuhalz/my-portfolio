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

type HeroHandler struct {
	service *service.HeroService
}

func NewHeroHandler(heroService *service.HeroService) *HeroHandler {
	return &HeroHandler{
		service: heroService,
	}
}

func (h *HeroHandler) Get(w http.ResponseWriter, r *http.Request) {
	hero, err := h.service.Get(r.Context())
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			writeJSONError(w, http.StatusNotFound, "hero not found")
			return
		}

		log.Printf("Failed to get hero: %v", err)
		writeJSONError(w, http.StatusInternalServerError, "internal server error")
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)

	if err := json.NewEncoder(w).Encode(hero); err != nil {
		log.Printf("Failed to encode hero response: %v", err)
	}
}

func (h *HeroHandler) Update(w http.ResponseWriter, r *http.Request) {
	var request model.UpdateHeroRequest

	if err := decodeJSON(r, &request); err != nil {
		writeJSONError(w, http.StatusBadRequest, "invalid JSON request")
		return
	}

	hero, err := h.service.Update(r.Context(), request)
	if err != nil {
		var validationErr *service.ValidationError

		if errors.As(err, &validationErr) {
			writeJSONError(w, http.StatusBadRequest, validationErr.Message)
			return
		}

		if errors.Is(err, pgx.ErrNoRows) {
			writeJSONError(w, http.StatusNotFound, "hero not found")
			return
		}

		log.Printf("Failed to update hero: %v", err)
		writeJSONError(w, http.StatusInternalServerError, "internal server error")
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)

	if err := json.NewEncoder(w).Encode(hero); err != nil {
		log.Printf("Failed to encode hero response: %v", err)
	}
}
