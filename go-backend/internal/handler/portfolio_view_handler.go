package handler

import (
	"encoding/json"
	"net/http"

	"github.com/azuhalz/my-portfolio/go-backend/internal/model"
	"github.com/azuhalz/my-portfolio/go-backend/internal/service"
)

type PortfolioViewHandler struct {
	Service *service.PortfolioViewService
}

func NewPortfolioViewHandler(svc *service.PortfolioViewService) *PortfolioViewHandler {
	return &PortfolioViewHandler{
		Service: svc,
	}
}

func (h *PortfolioViewHandler) Create(w http.ResponseWriter, r *http.Request) {
	view := &model.PortfolioView{}

	err := h.Service.Create(r.Context(), view)
	if err != nil {
		http.Error(w, "Failed to record portfolio view", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)

	json.NewEncoder(w).Encode(map[string]string{
		"message": "Portfolio view recorded successfully",
	})
}
