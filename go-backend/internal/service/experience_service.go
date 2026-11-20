package service

import (
	"context"
	"errors"
	"strings"
	"time"

	"github.com/azuhalz/my-portfolio/go-backend/internal/model"
)

var ErrInvalidExperience = errors.New("invalid experience data")

type ExperienceRepository interface {
	GetAll(ctx context.Context, experienceType string) ([]model.Experience, error)

	GetByID(ctx context.Context, id int16) (model.Experience, error)

	Create(
		ctx context.Context,
		request model.CreateExperienceRequest,
	) (model.Experience, error)

	Update(
		ctx context.Context,
		id int16,
		request model.UpdateExperienceRequest,
	) (model.Experience, error)

	Delete(ctx context.Context, id int16) error

	Reorder(ctx context.Context, experienceType string, ids []int16) error
}

type ExperienceService struct {
	repository ExperienceRepository
}

func NewExperienceService(repository ExperienceRepository) *ExperienceService {
	return &ExperienceService{
		repository: repository,
	}
}

func (s *ExperienceService) GetAll(
	ctx context.Context,
	experienceType string,
) ([]model.Experience, error) {
	experienceType = strings.TrimSpace(experienceType)

	if experienceType != "" &&
		experienceType != "work" &&
		experienceType != "organization" {
		return nil, &ValidationError{
			Message: "type must be work or organization",
		}
	}

	return s.repository.GetAll(ctx, experienceType)
}

func (s *ExperienceService) GetByID(
	ctx context.Context,
	id int16,
) (model.Experience, error) {
	if id <= 0 {
		return model.Experience{}, &ValidationError{
			Message: "experience ID must be greater than zero",
		}
	}

	return s.repository.GetByID(ctx, id)
}

func (s *ExperienceService) Create(
	ctx context.Context,
	request model.CreateExperienceRequest,
) (model.Experience, error) {
	request.Type = strings.TrimSpace(request.Type)
	request.Title = strings.TrimSpace(request.Title)
	request.Organization = strings.TrimSpace(request.Organization)

	if err := validateExperience(
		request.Type,
		request.Title,
		request.Organization,
		request.StartDate,
		request.EndDate,
	); err != nil {
		return model.Experience{}, err
	}

	request.Points = cleanExperiencePoints(request.Points)

	if request.Points == nil {
		request.Points = []string{}
	}

	return s.repository.Create(ctx, request)
}

func (s *ExperienceService) Update(
	ctx context.Context,
	id int16,
	request model.UpdateExperienceRequest,
) (model.Experience, error) {
	if id <= 0 {
		return model.Experience{}, &ValidationError{
			Message: "experience ID must be greater than zero",
		}
	}

	request.Type = strings.TrimSpace(request.Type)
	request.Title = strings.TrimSpace(request.Title)
	request.Organization = strings.TrimSpace(request.Organization)

	if err := validateExperience(
		request.Type,
		request.Title,
		request.Organization,
		request.StartDate,
		request.EndDate,
	); err != nil {
		return model.Experience{}, err
	}

	request.Points = cleanExperiencePoints(request.Points)

	if request.Points == nil {
		request.Points = []string{}
	}

	return s.repository.Update(ctx, id, request)
}

func (s *ExperienceService) Delete(
	ctx context.Context,
	id int16,
) error {
	if id <= 0 {
		return &ValidationError{
			Message: "experience ID must be greater than zero",
		}
	}

	return s.repository.Delete(ctx, id)
}

func (s *ExperienceService) Reorder(
	ctx context.Context,
	experienceType string,
	ids []int16,
) error {
	experienceType = strings.TrimSpace(experienceType)

	if experienceType != "work" && experienceType != "organization" {
		return &ValidationError{
			Message: "type must be work or organization",
		}
	}

	if len(ids) == 0 {
		return &ValidationError{
			Message: "experience order cannot be empty",
		}
	}

	seen := make(map[int16]bool, len(ids))

	for _, id := range ids {
		if id <= 0 {
			return &ValidationError{
				Message: "experience ID must be greater than zero",
			}
		}

		if seen[id] {
			return &ValidationError{
				Message: "duplicate experience ID",
			}
		}

		seen[id] = true
	}

	return s.repository.Reorder(ctx, experienceType, ids)
}

func validateExperience(
	experienceType string,
	title string,
	organization string,
	startDate time.Time,
	endDate *time.Time,
) error {
	if experienceType != "work" && experienceType != "organization" {
		return &ValidationError{
			Message: "type must be work or organization",
		}
	}

	if title == "" {
		return &ValidationError{
			Message: "title is required",
		}
	}

	if organization == "" {
		return &ValidationError{
			Message: "organization is required",
		}
	}

	if startDate.IsZero() {
		return &ValidationError{
			Message: "start_date is required",
		}
	}

	if endDate != nil && endDate.Before(startDate) {
		return &ValidationError{
			Message: "end_date cannot be earlier than start_date",
		}
	}

	return nil
}

func cleanExperiencePoints(points []string) []string {
	cleaned := make([]string, 0, len(points))

	for _, point := range points {
		point = strings.TrimSpace(point)

		if point != "" {
			cleaned = append(cleaned, point)
		}
	}

	return cleaned
}
