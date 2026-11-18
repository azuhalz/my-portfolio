package service

import (
	"context"
	"errors"
	"strings"

	"github.com/azuhalz/my-portfolio/go-backend/internal/model"
	"github.com/azuhalz/my-portfolio/go-backend/internal/repository"
	"github.com/jackc/pgx/v5"
)

var ErrInvalidEducation = errors.New("invalid education data")

type EducationRepository interface {
	GetAll(ctx context.Context) ([]model.Education, error)
	GetByID(ctx context.Context, id int16) (model.Education, error)
	Create(ctx context.Context, request model.CreateEducationRequest) (model.Education, error)
	Update(ctx context.Context, id int16, request model.UpdateEducationRequest) (model.Education, error)
	Delete(ctx context.Context, id int16) error
}

type EducationService struct {
	repository EducationRepository
}

func NewEducationService(repository EducationRepository) *EducationService {
	return &EducationService{
		repository: repository,
	}
}

func (s *EducationService) GetAll(ctx context.Context) ([]model.Education, error) {
	return s.repository.GetAll(ctx)
}

func (s *EducationService) GetByID(ctx context.Context, id int16) (model.Education, error) {
	if id <= 0 {
		return model.Education{}, ErrInvalidEducation
	}

	return s.repository.GetByID(ctx, id)
}

func validateEducation(
	institution string,
	level string,
	fieldOfStudy string,
	startYear int16,
	endYear *int16,
	isCurrent bool,
) error {
	if strings.TrimSpace(institution) == "" ||
		strings.TrimSpace(level) == "" ||
		strings.TrimSpace(fieldOfStudy) == "" ||
		startYear <= 0 {
		return ErrInvalidEducation
	}

	if endYear != nil && *endYear < startYear {
		return ErrInvalidEducation
	}

	if isCurrent && endYear != nil {
		return ErrInvalidEducation
	}

	if !isCurrent && endYear == nil {
		return ErrInvalidEducation
	}

	return nil
}

func cleanEducationGPA(gpa *string) *string {
	if gpa == nil {
		return nil
	}

	value := strings.TrimSpace(*gpa)
	if value == "" {
		return nil
	}

	return &value
}

func (s *EducationService) Create(
	ctx context.Context,
	request model.CreateEducationRequest,
) (model.Education, error) {
	request.Institution = strings.TrimSpace(request.Institution)
	request.Level = strings.TrimSpace(request.Level)
	request.FieldOfStudy = strings.TrimSpace(request.FieldOfStudy)
	request.GPA = cleanEducationGPA(request.GPA)

	if err := validateEducation(
		request.Institution,
		request.Level,
		request.FieldOfStudy,
		request.StartYear,
		request.EndYear,
		request.IsCurrent,
	); err != nil {
		return model.Education{}, err
	}

	return s.repository.Create(ctx, request)
}

func (s *EducationService) Update(
	ctx context.Context,
	id int16,
	request model.UpdateEducationRequest,
) (model.Education, error) {
	if id <= 0 {
		return model.Education{}, ErrInvalidEducation
	}

	request.Institution = strings.TrimSpace(request.Institution)
	request.Level = strings.TrimSpace(request.Level)
	request.FieldOfStudy = strings.TrimSpace(request.FieldOfStudy)
	request.GPA = cleanEducationGPA(request.GPA)

	if err := validateEducation(
		request.Institution,
		request.Level,
		request.FieldOfStudy,
		request.StartYear,
		request.EndYear,
		request.IsCurrent,
	); err != nil {
		return model.Education{}, err
	}

	return s.repository.Update(ctx, id, request)
}

func (s *EducationService) Delete(ctx context.Context, id int16) error {
	if id <= 0 {
		return ErrInvalidEducation
	}

	err := s.repository.Delete(ctx, id)
	if err != nil {
		if err == pgx.ErrNoRows {
			return pgx.ErrNoRows
		}
		return err
	}

	return nil
}

// Compile-time check that the repository package implements the interface.
var _ EducationRepository = (*repository.EducationRepository)(nil)
