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

type ProjectHandler struct {
	service *service.ProjectService
}

func NewProjectHandler(service *service.ProjectService) *ProjectHandler {
	return &ProjectHandler{service: service}
}

func (h *ProjectHandler) GetAll(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	projects, err := h.service.GetAll(r.Context())
	if err != nil {
		log.Printf("Failed to get projects: %v", err)
		writeJSONError(w, http.StatusInternalServerError, "Internal server error")
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
			writeJSONError(w, http.StatusNotFound, "Project not found")
			return
		}

		log.Printf("Failed to get project: %v", err)
		writeJSONError(w, http.StatusInternalServerError, "Internal server error")
		return
	}

	if err := json.NewEncoder(w).Encode(project); err != nil {
		log.Printf("Failed to encode project: %v", err)
	}
}

func (h *ProjectHandler) Create(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var request model.CreateProjectRequest

	if err := decodeJSON(r, &request); err != nil {
		writeJSONError(w, http.StatusBadRequest, "Invalid JSON request")
		return
	}

	project, err := h.service.Create(r.Context(), request)
	if err != nil {
		var validationErr *service.ValidationError

		if errors.As(err, &validationErr) {
			writeJSONError(w, http.StatusBadRequest, validationErr.Error())
			return
		}

		if errors.Is(err, service.ErrSlugAlreadyExists) {
			writeJSONError(w, http.StatusConflict, err.Error())
			return
		}

		log.Printf("Failed to create project: %v", err)
		writeJSONError(w, http.StatusInternalServerError, "Internal server error")
		return
	}

	w.WriteHeader(http.StatusCreated)

	if err := json.NewEncoder(w).Encode(project); err != nil {
		log.Printf("Failed to encode created project: %v", err)
	}
}

func (h *ProjectHandler) Update(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	slug := r.PathValue("slug")

	var request model.UpdateProjectRequest

	if err := decodeJSON(r, &request); err != nil {
		writeJSONError(w, http.StatusBadRequest, "Invalid JSON request")
		return
	}

	project, err := h.service.Update(r.Context(), slug, request)
	if err != nil {
		var validationErr *service.ValidationError

		if errors.As(err, &validationErr) {
			writeJSONError(w, http.StatusBadRequest, validationErr.Error())
			return
		}

		if errors.Is(err, pgx.ErrNoRows) {
			writeJSONError(w, http.StatusNotFound, "Project not found")
			return
		}

		log.Printf("Failed to update project: %v", err)
		writeJSONError(w, http.StatusInternalServerError, "Internal server error")
		return
	}

	if err := json.NewEncoder(w).Encode(project); err != nil {
		log.Printf("Failed to encode updated project: %v", err)
	}
}

func (h *ProjectHandler) Delete(w http.ResponseWriter, r *http.Request) {
	slug := r.PathValue("slug")

	err := h.service.Delete(r.Context(), slug)
	if err != nil {
		if errors.Is(err, service.ErrInvalidProject) {
			writeJSONError(w, http.StatusBadRequest, err.Error())
			return
		}

		if errors.Is(err, pgx.ErrNoRows) {
			writeJSONError(w, http.StatusNotFound, "Project not found")
			return
		}

		log.Printf("Failed to delete project: %v", err)
		writeJSONError(w, http.StatusInternalServerError, "Internal server error")
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

func (h *ProjectHandler) Reorder(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var request model.ReorderProjectsRequest

	if err := decodeJSON(r, &request); err != nil {
		writeJSONError(w, http.StatusBadRequest, "Invalid JSON request")
		return
	}

	if err := h.service.Reorder(r.Context(), request.Slugs); err != nil {
		var validationErr *service.ValidationError

		if errors.As(err, &validationErr) {
			writeJSONError(w, http.StatusBadRequest, validationErr.Error())
			return
		}

		log.Printf("Failed to reorder projects: %v", err)
		writeJSONError(w, http.StatusInternalServerError, "Internal server error")
		return
	}

	writeJSON(w, map[string]string{
		"message": "Project order updated successfully",
	})
}

func writeJSONError(w http.ResponseWriter, statusCode int, message string) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(statusCode)

	json.NewEncoder(w).Encode(map[string]string{
		"error": message,
	})
}

func writeJSON(w http.ResponseWriter, data any) error {
	return json.NewEncoder(w).Encode(data)
}

func decodeJSON(r *http.Request, destination any) error {
	decoder := json.NewDecoder(r.Body)
	decoder.DisallowUnknownFields()

	if err := decoder.Decode(destination); err != nil {
		return err
	}

	var extra any

	if err := decoder.Decode(&extra); err != io.EOF {
		if err == nil {
			return errors.New("request body must contain only one JSON object")
		}

		return err
	}

	return nil
}
