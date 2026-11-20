package handler

import (
	"encoding/json"
	"errors"
	"io"
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

func (h *HeroHandler) UploadImage(w http.ResponseWriter, r *http.Request) {
	r.Body = http.MaxBytesReader(w, r.Body, service.MaxHeroImageSize+64*1024)

	if err := r.ParseMultipartForm(service.MaxHeroImageSize); err != nil {
		writeJSONError(w, http.StatusBadRequest, "invalid image upload")
		return
	}

	file, header, err := r.FormFile("image")
	if err != nil {
		writeJSONError(w, http.StatusBadRequest, "image file is required")
		return
	}
	defer file.Close()

	imageData, err := io.ReadAll(file)
	if err != nil {
		writeJSONError(w, http.StatusBadRequest, "failed to read image")
		return
	}

	hero, err := h.service.UploadImage(
		r.Context(),
		imageData,
		header.Filename,
	)
	if err != nil {
		if errors.Is(err, service.ErrInvalidHeroImage) {
			writeJSONError(w, http.StatusBadRequest, "invalid image format or size")
			return
		}

		if errors.Is(err, pgx.ErrNoRows) {
			writeJSONError(w, http.StatusNotFound, "hero not found")
			return
		}

		log.Printf("Failed to upload hero image: %v", err)
		writeJSONError(w, http.StatusInternalServerError, "internal server error")
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)

	if err := json.NewEncoder(w).Encode(hero); err != nil {
		log.Printf("Failed to encode hero image response: %v", err)
	}
}

func (h *HeroHandler) GetImage(w http.ResponseWriter, r *http.Request) {
	hero, err := h.service.GetImage(r.Context())
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			http.NotFound(w, r)
			return
		}

		log.Printf("Failed to get hero image: %v", err)
		http.Error(w, "internal server error", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", *hero.ProfileImageMimeType)
	w.Header().Set("X-Content-Type-Options", "nosniff")
	w.Header().Set("Cache-Control", "public, max-age=31536000, immutable")

	w.WriteHeader(http.StatusOK)

	if _, err := w.Write(hero.ProfileImageData); err != nil {
		log.Printf("Failed to write hero image: %v", err)
	}
}

func (h *HeroHandler) DeleteImage(w http.ResponseWriter, r *http.Request) {
	err := h.service.DeleteImage(r.Context())
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			writeJSONError(w, http.StatusNotFound, "hero not found")
			return
		}

		log.Printf("Failed to delete hero image: %v", err)
		writeJSONError(w, http.StatusInternalServerError, "internal server error")
		return
	}

	w.WriteHeader(http.StatusNoContent)
}
