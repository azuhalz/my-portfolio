package handler

import (
	"encoding/json"
	"net/http"

	"github.com/azuhalz/my-portfolio/go-backend/internal/service"
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

	projects := h.service.GetAll()

	json.NewEncoder(w).Encode(projects)
}

func (h *ProjectHandler) GetBySlug(w http.ResponseWriter, r *http.Request) {
	slug := r.PathValue("slug")

	project, found := h.service.GetBySlug(slug)

	w.Header().Set("Content-Type", "application/json")

	if !found {
		http.Error(w, `{"error":"Project not found"}`, http.StatusNotFound)
		return
	}

	json.NewEncoder(w).Encode(project)
}
