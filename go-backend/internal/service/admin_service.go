package service

import (
	"context"
	"errors"
	"net/mail"
	"strings"
	"unicode/utf8"

	"github.com/azuhalz/my-portfolio/go-backend/internal/model"
	"github.com/azuhalz/my-portfolio/go-backend/internal/repository"
	"github.com/jackc/pgx/v5"
	"golang.org/x/crypto/bcrypt"
)

type AdminService struct {
	repo *repository.AdminRepository
}

func NewAdminService(repo *repository.AdminRepository) *AdminService {
	return &AdminService{repo: repo}
}

func (s *AdminService) Get(ctx context.Context) (*model.Admin, error) {
	admin, err := s.repo.Get(ctx)
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return nil, errors.New("admin not found")
		}
		return nil, err
	}

	return admin, nil
}

func (s *AdminService) UpdateProfile(
	ctx context.Context,
	req model.UpdateAdminProfileRequest,
) (*model.Admin, error) {
	req.Name = strings.TrimSpace(req.Name)
	req.Email = strings.TrimSpace(req.Email)

	if req.Name == "" {
		return nil, errors.New("name is required")
	}

	if utf8.RuneCountInString(req.Name) > 100 {
		return nil, errors.New("name must not exceed 100 characters")
	}

	if req.Email == "" {
		return nil, errors.New("email is required")
	}

	if len(req.Email) > 254 {
		return nil, errors.New("email must not exceed 254 characters")
	}

	if _, err := mail.ParseAddress(req.Email); err != nil {
		return nil, errors.New("invalid email address")
	}

	admin, err := s.repo.UpdateProfile(ctx, req.Name, req.Email)
	if err != nil {
		return nil, err
	}

	return admin, nil
}

func (s *AdminService) UpdatePassword(
	ctx context.Context,
	req model.UpdateAdminPasswordRequest,
) error {
	if req.CurrentPassword == "" {
		return errors.New("current password is required")
	}

	if len(req.NewPassword) < 8 {
		return errors.New("new password must be at least 8 characters")
	}

	if len(req.NewPassword) > 72 {
		return errors.New("new password must not exceed 72 bytes")
	}

	id, currentHash, err := s.repo.GetPasswordHash(ctx)
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return errors.New("admin not found")
		}
		return err
	}

	if err := bcrypt.CompareHashAndPassword(
		[]byte(currentHash),
		[]byte(req.CurrentPassword),
	); err != nil {
		return errors.New("current password is incorrect")
	}

	newHash, err := bcrypt.GenerateFromPassword(
		[]byte(req.NewPassword),
		bcrypt.DefaultCost,
	)
	if err != nil {
		return err
	}

	return s.repo.UpdatePasswordHash(ctx, id, string(newHash))
}
