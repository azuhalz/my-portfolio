package service

import (
	"context"

	"github.com/azuhalz/my-portfolio/go-backend/internal/model"
	"github.com/azuhalz/my-portfolio/go-backend/internal/repository"
)

type ContactService struct {
	repository *repository.ContactRepository
}

func NewContactService(
	repository *repository.ContactRepository,
) *ContactService {
	return &ContactService{
		repository: repository,
	}
}

func (s *ContactService) GetContact(
	ctx context.Context,
) (*model.Contact, error) {
	return s.repository.GetContact(ctx)
}

func (s *ContactService) UpdateContact(
	ctx context.Context,
	request model.UpdateContactRequest,
) (*model.Contact, error) {
	return s.repository.UpdateContact(ctx, request)
}

func (s *ContactService) UploadCV(
	ctx context.Context,
	request model.UploadCVRequest,
) error {
	return s.repository.UploadCV(ctx, request)
}

func (s *ContactService) GetCV(
	ctx context.Context,
) (*model.UploadCVRequest, error) {
	return s.repository.GetCV(ctx)
}
