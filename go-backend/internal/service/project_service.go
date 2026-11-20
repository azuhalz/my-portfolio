package service

import (
	"context"
	"errors"
	"regexp"
	"strings"

	"github.com/azuhalz/my-portfolio/go-backend/internal/model"
	"github.com/azuhalz/my-portfolio/go-backend/internal/repository"
)

var (
	ErrInvalidProject    = errors.New("invalid project data")
	ErrSlugAlreadyExists = errors.New("project slug already exists")
)

type ValidationError struct {
	Message string
}

func (e *ValidationError) Error() string {
	return e.Message
}

type ProjectRepository interface {
	GetAll(ctx context.Context) ([]model.Project, error)
	GetBySlug(ctx context.Context, slug string) (model.Project, error)
	Create(
		ctx context.Context,
		slug string,
		request model.CreateProjectRequest,
	) (model.Project, error)
	Update(
		ctx context.Context,
		slug string,
		request model.UpdateProjectRequest,
	) (model.Project, error)
	Delete(ctx context.Context, slug string) error
	Reorder(ctx context.Context, slugs []string) error
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

func (s *ProjectService) Create(
	ctx context.Context,
	request model.CreateProjectRequest,
) (model.Project, error) {
	request.Title = strings.TrimSpace(request.Title)

	if err := validateCreateProject(request); err != nil {
		return model.Project{}, err
	}

	if request.TechStack == nil {
		request.TechStack = []string{}
	}

	slug := generateSlug(request.Title)
	if slug == "" {
		return model.Project{}, &ValidationError{
			Message: "title must contain letters or numbers",
		}
	}

	project, err := s.repository.Create(ctx, slug, request)
	if err != nil {
		if errors.Is(err, repository.ErrDuplicateSlug) {
			return model.Project{}, ErrSlugAlreadyExists
		}

		return model.Project{}, err
	}

	return project, nil
}

func (s *ProjectService) Update(
	ctx context.Context,
	slug string,
	request model.UpdateProjectRequest,
) (model.Project, error) {
	request.Title = strings.TrimSpace(request.Title)

	if strings.TrimSpace(request.Title) == "" {
		return model.Project{}, &ValidationError{
			Message: "title is required",
		}
	}

	if strings.TrimSpace(request.Type) == "" {
		return model.Project{}, &ValidationError{
			Message: "type is required",
		}
	}

	if strings.TrimSpace(request.Timeline) == "" {
		return model.Project{}, &ValidationError{
			Message: "timeline is required",
		}
	}

	if strings.TrimSpace(request.Overview) == "" {
		return model.Project{}, &ValidationError{
			Message: "overview is required",
		}
	}

	if generateSlug(request.Title) == "" {
		return model.Project{}, &ValidationError{
			Message: "title must contain letters or numbers",
		}
	}

	if request.TechStack == nil {
		request.TechStack = []string{}
	}

	project, err := s.repository.Update(ctx, slug, request)
	if err != nil {
		return model.Project{}, err
	}

	return project, nil
}

func (s *ProjectService) Reorder(
	ctx context.Context,
	slugs []string,
) error {
	if len(slugs) == 0 {
		return &ValidationError{
			Message: "project order cannot be empty",
		}
	}

	seen := make(map[string]bool, len(slugs))

	for i, slug := range slugs {
		slug = strings.TrimSpace(slug)

		if slug == "" {
			return &ValidationError{
				Message: "project slug cannot be empty",
			}
		}

		if seen[slug] {
			return &ValidationError{
				Message: "duplicate project slug",
			}
		}

		seen[slug] = true
		slugs[i] = slug
	}

	return s.repository.Reorder(ctx, slugs)
}

func generateSlug(title string) string {
	slug := strings.ToLower(title)
	slug = strings.TrimSpace(slug)

	nonAlphanumeric := regexp.MustCompile(`[^a-z0-9]+`)
	slug = nonAlphanumeric.ReplaceAllString(slug, "-")
	slug = strings.Trim(slug, "-")

	return slug
}

func validateCreateProject(request model.CreateProjectRequest) error {
	if strings.TrimSpace(request.Title) == "" {
		return &ValidationError{Message: "title is required"}
	}

	if strings.TrimSpace(request.Type) == "" {
		return &ValidationError{Message: "type is required"}
	}

	if strings.TrimSpace(request.Timeline) == "" {
		return &ValidationError{Message: "timeline is required"}
	}

	if strings.TrimSpace(request.Overview) == "" {
		return &ValidationError{Message: "overview is required"}
	}

	return nil
}

func (s *ProjectService) Delete(
	ctx context.Context,
	slug string,
) error {
	if strings.TrimSpace(slug) == "" {
		return ErrInvalidProject
	}

	return s.repository.Delete(ctx, slug)
}
