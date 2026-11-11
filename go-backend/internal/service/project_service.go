package service

import (
	"github.com/azuhalz/my-portfolio/go-backend/internal/model"
)

type ProjectRepository interface {
	GetAll() []model.Project
	GetBySlug(slug string) (model.Project, bool)
}

type ProjectService struct {
	repository ProjectRepository
}

func NewProjectService(repository ProjectRepository) *ProjectService {
	return &ProjectService{
		repository: repository,
	}
}

func (s *ProjectService) GetAll() []model.Project {
	return s.repository.GetAll()
}

func (s *ProjectService) GetBySlug(slug string) (model.Project, bool) {
	return s.repository.GetBySlug(slug)
}
