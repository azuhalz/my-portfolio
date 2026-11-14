package service

import (
	"context"

	"github.com/azuhalz/my-portfolio/go-backend/internal/model"
)

type ProjectRepository interface {
	GetAll(ctx context.Context) ([]model.Project, error)
	GetBySlug(ctx context.Context, slug string) (model.Project, error)
}

type ProjectService struct {
	repository ProjectRepository
}

func NewProjectService(repository ProjectRepository) *ProjectService {
	return &ProjectService{
		repository: repository,
	}
}

func (s *ProjectService) GetAll(ctx context.Context) ([]model.Project, error) {
	return s.repository.GetAll(ctx)
}

func (s *ProjectService) GetBySlug(ctx context.Context, slug string) (model.Project, error) {
	return s.repository.GetBySlug(ctx, slug)
}
