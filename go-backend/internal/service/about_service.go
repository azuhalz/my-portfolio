package service

import (
	"context"
	"strings"

	"github.com/azuhalz/my-portfolio/go-backend/internal/model"
)

type AboutRepository interface {
	Get(ctx context.Context) (model.About, error)
	Update(ctx context.Context, request model.UpdateAboutRequest) (model.About, error)
}

type AboutService struct {
	repository AboutRepository
}

func NewAboutService(repository AboutRepository) *AboutService {
	return &AboutService{
		repository: repository,
	}
}

func (s *AboutService) Get(ctx context.Context) (model.About, error) {
	return s.repository.Get(ctx)
}

func (s *AboutService) Update(
	ctx context.Context,
	request model.UpdateAboutRequest,
) (model.About, error) {
	request.Description = strings.TrimSpace(request.Description)
	request.Location = strings.TrimSpace(request.Location)
	request.Phone = strings.TrimSpace(request.Phone)
	request.Email = strings.TrimSpace(request.Email)
	request.LinkedInURL = strings.TrimSpace(request.LinkedInURL)
	request.GitHubURL = strings.TrimSpace(request.GitHubURL)
	request.AvailabilityStatus = strings.TrimSpace(request.AvailabilityStatus)

	fields := map[string]string{
		"description":         request.Description,
		"location":            request.Location,
		"phone":               request.Phone,
		"email":               request.Email,
		"linkedin_url":        request.LinkedInURL,
		"github_url":          request.GitHubURL,
		"availability_status": request.AvailabilityStatus,
	}

	for field, value := range fields {
		if value == "" {
			return model.About{}, &ValidationError{
				Message: field + " is required",
			}
		}
	}

	return s.repository.Update(ctx, request)
}
