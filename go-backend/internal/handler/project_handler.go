package handler

import (
	"encoding/json"
	"errors"
	"log"
	"net/http"

	"github.com/azuhalz/my-portfolio/go-backend/internal/service"
	"github.com/jackc/pgx/v5"
)

type ProjectHandler struct {
	service *service.ProjectService
}

func NewProjectHandler(service *service.ProjectService) *ProjectHandler {
	return &ProjectHandler{
		service: service,
	}
}

func (h *ProjectHandler) GetAll(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	projects, err := h.service.GetAll(r.Context())
	if err != nil {
		log.Printf("Failed to get projects: %v", err)
		http.Error(w, `{"error":"Internal server error"}`, http.StatusInternalServerError)
		return
	}

	if err := json.NewEncoder(w).Encode(projects); err != nil {
		log.Printf("Failed to encode projects: %v", err)
	}
}

func (h *ProjectHandler) GetBySlug(w http.ResponseWriter, r *http.Request) {
	slug := r.PathValue("slug")

	w.Header().Set("Content-Type", "application/json")

	project, err := h.service.GetBySlug(r.Context(), slug)
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			http.Error(w, `{"error":"Project not found"}`, http.StatusNotFound)
			return
		}

		log.Printf("Failed to get project: %v", err)
		http.Error(w, `{"error":"Internal server error"}`, http.StatusInternalServerError)
		return
	}

	if err := json.NewEncoder(w).Encode(project); err != nil {
		log.Printf("Failed to encode project: %v", err)
	}
}
