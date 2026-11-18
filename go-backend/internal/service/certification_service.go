package service

import (
	"context"
	"errors"
	"strings"

	"github.com/azuhalz/my-portfolio/go-backend/internal/model"
	"github.com/jackc/pgx/v5"
)

var ErrInvalidCertification = errors.New("invalid certification data")

type CertificationRepository interface {
	GetAll(ctx context.Context) ([]model.Certification, error)
	GetByID(ctx context.Context, id int16) (model.Certification, error)
	Create(ctx context.Context, request model.CreateCertificationRequest) (model.Certification, error)
	Update(ctx context.Context, id int16, request model.UpdateCertificationRequest) (model.Certification, error)
	Delete(ctx context.Context, id int16) error
}

type CertificationService struct {
	repository CertificationRepository
}

func NewCertificationService(repository CertificationRepository) *CertificationService {
	return &CertificationService{
		repository: repository,
	}
}

func (s *CertificationService) GetAll(ctx context.Context) ([]model.Certification, error) {
	return s.repository.GetAll(ctx)
}

func (s *CertificationService) GetByID(ctx context.Context, id int16) (model.Certification, error) {
	if id <= 0 {
		return model.Certification{}, ErrInvalidCertification
	}

	return s.repository.GetByID(ctx, id)
}

func (s *CertificationService) Create(ctx context.Context, request model.CreateCertificationRequest) (model.Certification, error) {
	request.Name = strings.TrimSpace(request.Name)
	request.Issuer = strings.TrimSpace(request.Issuer)
	request.CredentialURL = strings.TrimSpace(request.CredentialURL)

	if request.Name == "" ||
		request.Issuer == "" ||
		request.IssuedDate.IsZero() ||
		request.CredentialURL == "" {
		return model.Certification{}, ErrInvalidCertification
	}

	if request.ExpiryDate != nil && request.ExpiryDate.Before(request.IssuedDate) {
		return model.Certification{}, ErrInvalidCertification
	}

	return s.repository.Create(ctx, request)
}

func (s *CertificationService) Update(ctx context.Context, id int16, request model.UpdateCertificationRequest) (model.Certification, error) {
	if id <= 0 {
		return model.Certification{}, ErrInvalidCertification
	}

	request.Name = strings.TrimSpace(request.Name)
	request.Issuer = strings.TrimSpace(request.Issuer)
	request.CredentialURL = strings.TrimSpace(request.CredentialURL)

	if request.Name == "" ||
		request.Issuer == "" ||
		request.IssuedDate.IsZero() ||
		request.CredentialURL == "" {
		return model.Certification{}, ErrInvalidCertification
	}

	if request.ExpiryDate != nil && request.ExpiryDate.Before(request.IssuedDate) {
		return model.Certification{}, ErrInvalidCertification
	}

	return s.repository.Update(ctx, id, request)
}

func (s *CertificationService) Delete(ctx context.Context, id int16) error {
	if id <= 0 {
		return ErrInvalidCertification
	}

	err := s.repository.Delete(ctx, id)
	if errors.Is(err, pgx.ErrNoRows) {
		return pgx.ErrNoRows
	}

	return err
}
