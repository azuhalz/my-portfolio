package handler

import (
	"encoding/json"
	"net/http"

	"github.com/azuhalz/my-portfolio/go-backend/internal/service"
)

type DashboardHandler struct {
	Service *service.DashboardService
}

func NewDashboardHandler(svc *service.DashboardService) *DashboardHandler {
	return &DashboardHandler{
		Service: svc,
	}
}

func (h *DashboardHandler) GetStats(w http.ResponseWriter, r *http.Request) {
	stats, err := h.Service.GetStats(r.Context())
	if err != nil {
		http.Error(w, "Failed to get dashboard statistics", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")

	json.NewEncoder(w).Encode(stats)
}
