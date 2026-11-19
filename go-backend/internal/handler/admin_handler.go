package handler

import (
	"encoding/json"
	"net/http"

	"github.com/azuhalz/my-portfolio/go-backend/internal/model"
	"github.com/azuhalz/my-portfolio/go-backend/internal/service"
)

type AdminHandler struct {
	service *service.AdminService
}

func NewAdminHandler(service *service.AdminService) *AdminHandler {
	return &AdminHandler{service: service}
}

func (h *AdminHandler) Get(w http.ResponseWriter, r *http.Request) {
	admin, err := h.service.Get(r.Context())
	if err != nil {
		writeJSONError(w, http.StatusInternalServerError, err.Error())
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(admin)
}

func (h *AdminHandler) UpdateProfile(w http.ResponseWriter, r *http.Request) {
	var req model.UpdateAdminProfileRequest

	if err := decodeJSON(r, &req); err != nil {
		writeJSONError(w, http.StatusBadRequest, "Invalid request body")
		return
	}

	admin, err := h.service.UpdateProfile(r.Context(), req)
	if err != nil {
		writeJSONError(w, http.StatusBadRequest, err.Error())
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(admin)
}

func (h *AdminHandler) UpdatePassword(w http.ResponseWriter, r *http.Request) {
	var req model.UpdateAdminPasswordRequest

	if err := decodeJSON(r, &req); err != nil {
		writeJSONError(w, http.StatusBadRequest, "Invalid request body")
		return
	}

	if err := h.service.UpdatePassword(r.Context(), req); err != nil {
		writeJSONError(w, http.StatusBadRequest, err.Error())
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{
		"message": "Password updated successfully",
	})
}
