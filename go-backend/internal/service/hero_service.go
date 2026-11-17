package service

import (
	"context"
	"strings"

	"github.com/azuhalz/my-portfolio/go-backend/internal/model"
)

type HeroRepository interface {
	Get(ctx context.Context) (model.Hero, error)
	Update(
		ctx context.Context,
		request model.UpdateHeroRequest,
	) (model.Hero, error)
}

type HeroService struct {
	repository HeroRepository
}

func NewHeroService(repository HeroRepository) *HeroService {
	return &HeroService{
		repository: repository,
	}
}

func (s *HeroService) Get(ctx context.Context) (model.Hero, error) {
	return s.repository.Get(ctx)
}

func (s *HeroService) Update(
	ctx context.Context,
	request model.UpdateHeroRequest,
) (model.Hero, error) {
	request.Greeting = strings.TrimSpace(request.Greeting)
	request.Name = strings.TrimSpace(request.Name)
	request.Headline = strings.TrimSpace(request.Headline)
	request.WorkButton = strings.TrimSpace(request.WorkButton)
	request.ContactButton = strings.TrimSpace(request.ContactButton)
	request.ProfileImageURL = strings.TrimSpace(request.ProfileImageURL)
	request.Email = strings.TrimSpace(request.Email)
	request.LinkedInURL = strings.TrimSpace(request.LinkedInURL)
	request.GitHubURL = strings.TrimSpace(request.GitHubURL)

	if request.Greeting == "" {
		return model.Hero{}, &ValidationError{
			Message: "greeting is required",
		}
	}

	if request.Name == "" {
		return model.Hero{}, &ValidationError{
			Message: "name is required",
		}
	}

	if request.Headline == "" {
		return model.Hero{}, &ValidationError{
			Message: "headline is required",
		}
	}

	if request.WorkButton == "" {
		return model.Hero{}, &ValidationError{
			Message: "work_button is required",
		}
	}

	if request.ContactButton == "" {
		return model.Hero{}, &ValidationError{
			Message: "contact_button is required",
		}
	}

	if request.ProfileImageURL == "" {
		return model.Hero{}, &ValidationError{
			Message: "profile_image_url is required",
		}
	}

	if request.Email == "" {
		return model.Hero{}, &ValidationError{
			Message: "email is required",
		}
	}

	if request.LinkedInURL == "" {
		return model.Hero{}, &ValidationError{
			Message: "linkedin_url is required",
		}
	}

	if request.GitHubURL == "" {
		return model.Hero{}, &ValidationError{
			Message: "github_url is required",
		}
	}

	return s.repository.Update(ctx, request)
}
