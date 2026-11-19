package service

import (
	"context"

	"github.com/azuhalz/my-portfolio/go-backend/internal/model"
	"github.com/azuhalz/my-portfolio/go-backend/internal/repository"
)

type DashboardService struct {
	Repo *repository.DashboardRepository
}

func NewDashboardService(repo *repository.DashboardRepository) *DashboardService {
	return &DashboardService{
		Repo: repo,
	}
}

func (s *DashboardService) GetStats(ctx context.Context) (*model.DashboardStats, error) {
	return s.Repo.GetStats(ctx)
}
