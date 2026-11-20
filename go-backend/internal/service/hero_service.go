package service

import (
	"context"
	"errors"
	"net/http"
	"strings"

	"github.com/azuhalz/my-portfolio/go-backend/internal/model"
)

const MaxHeroImageSize = 5 * 1024 * 1024

var ErrInvalidHeroImage = errors.New("invalid hero image")

type HeroRepository interface {
	Get(ctx context.Context) (model.Hero, error)

	Update(
		ctx context.Context,
		request model.UpdateHeroRequest,
	) (model.Hero, error)

	UpdateImage(
		ctx context.Context,
		imageData []byte,
		mimeType string,
		fileName *string,
	) (model.Hero, error)

	GetImage(ctx context.Context) (model.Hero, error)

	DeleteImage(ctx context.Context) error
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
		return model.Hero{}, &ValidationError{Message: "greeting is required"}
	}

	if request.Name == "" {
		return model.Hero{}, &ValidationError{Message: "name is required"}
	}

	if request.Headline == "" {
		return model.Hero{}, &ValidationError{Message: "headline is required"}
	}

	if request.WorkButton == "" {
		return model.Hero{}, &ValidationError{Message: "work_button is required"}
	}

	if request.ContactButton == "" {
		return model.Hero{}, &ValidationError{Message: "contact_button is required"}
	}

	if request.ProfileImageURL == "" {
		return model.Hero{}, &ValidationError{Message: "profile_image_url is required"}
	}

	if request.Email == "" {
		return model.Hero{}, &ValidationError{Message: "email is required"}
	}

	if request.LinkedInURL == "" {
		return model.Hero{}, &ValidationError{Message: "linkedin_url is required"}
	}

	if request.GitHubURL == "" {
		return model.Hero{}, &ValidationError{Message: "github_url is required"}
	}

	return s.repository.Update(ctx, request)
}

func (s *HeroService) UploadImage(
	ctx context.Context,
	imageData []byte,
	fileName string,
) (model.Hero, error) {
	if len(imageData) == 0 || len(imageData) > MaxHeroImageSize {
		return model.Hero{}, ErrInvalidHeroImage
	}

	mimeType, err := detectHeroImageMimeType(imageData)
	if err != nil {
		return model.Hero{}, err
	}

	fileName = strings.TrimSpace(fileName)

	var savedFileName *string
	if fileName != "" {
		savedFileName = &fileName
	}

	return s.repository.UpdateImage(
		ctx,
		imageData,
		mimeType,
		savedFileName,
	)
}

func (s *HeroService) GetImage(
	ctx context.Context,
) (model.Hero, error) {
	return s.repository.GetImage(ctx)
}

func (s *HeroService) DeleteImage(ctx context.Context) error {
	return s.repository.DeleteImage(ctx)
}

func detectHeroImageMimeType(imageData []byte) (string, error) {
	mimeType := http.DetectContentType(imageData)

	switch mimeType {
	case "image/jpeg", "image/png":
		return mimeType, nil
	}

	if len(imageData) >= 12 &&
		string(imageData[0:4]) == "RIFF" &&
		string(imageData[8:12]) == "WEBP" {
		return "image/webp", nil
	}

	return "", ErrInvalidHeroImage
}
