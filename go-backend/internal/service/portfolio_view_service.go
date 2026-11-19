package service

import (
	"context"

	"github.com/azuhalz/my-portfolio/go-backend/internal/model"
	"github.com/azuhalz/my-portfolio/go-backend/internal/repository"
)

type PortfolioViewService struct {
	Repo *repository.PortfolioViewRepository
}

func NewPortfolioViewService(repo *repository.PortfolioViewRepository) *PortfolioViewService {
	return &PortfolioViewService{
		Repo: repo,
	}
}

func (s *PortfolioViewService) Create(ctx context.Context, view *model.PortfolioView) error {
	return s.Repo.Create(ctx, view)
}

func (s *PortfolioViewService) CountAll(ctx context.Context) (int64, error) {
	return s.Repo.CountAll(ctx)
}
