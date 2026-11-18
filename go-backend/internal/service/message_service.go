package service

import (
	"context"
	"errors"
	"net/mail"
	"strings"

	"github.com/azuhalz/my-portfolio/go-backend/internal/model"
	"github.com/jackc/pgx/v5"
)

var ErrInvalidMessage = errors.New("invalid message data")

type MessageRepository interface {
	GetAll(ctx context.Context) ([]model.Message, error)
	GetByID(ctx context.Context, id int16) (model.Message, error)
	Create(ctx context.Context, request model.CreateMessageRequest) (model.Message, error)
	UpdateStatus(ctx context.Context, id int16, request model.UpdateMessageStatusRequest) (model.Message, error)
	Delete(ctx context.Context, id int16) error
}

type MessageService struct {
	repository MessageRepository
}

func NewMessageService(repository MessageRepository) *MessageService {
	return &MessageService{
		repository: repository,
	}
}

func (s *MessageService) GetAll(ctx context.Context) ([]model.Message, error) {
	return s.repository.GetAll(ctx)
}

func (s *MessageService) GetByID(ctx context.Context, id int16) (model.Message, error) {
	if id <= 0 {
		return model.Message{}, ErrInvalidMessage
	}

	return s.repository.GetByID(ctx, id)
}

func (s *MessageService) Create(ctx context.Context, request model.CreateMessageRequest) (model.Message, error) {
	request.Name = strings.TrimSpace(request.Name)
	request.Email = strings.TrimSpace(request.Email)
	request.Message = strings.TrimSpace(request.Message)

	if request.Name == "" || request.Email == "" || request.Message == "" {
		return model.Message{}, ErrInvalidMessage
	}

	if len(request.Name) > 150 || len(request.Email) > 254 {
		return model.Message{}, ErrInvalidMessage
	}

	if _, err := mail.ParseAddress(request.Email); err != nil {
		return model.Message{}, ErrInvalidMessage
	}

	return s.repository.Create(ctx, request)
}

func (s *MessageService) UpdateStatus(ctx context.Context, id int16, request model.UpdateMessageStatusRequest) (model.Message, error) {
	if id <= 0 {
		return model.Message{}, ErrInvalidMessage
	}

	if request.IsRead == nil && request.IsArchived == nil {
		return model.Message{}, ErrInvalidMessage
	}

	return s.repository.UpdateStatus(ctx, id, request)
}

func (s *MessageService) Delete(ctx context.Context, id int16) error {
	if id <= 0 {
		return ErrInvalidMessage
	}

	err := s.repository.Delete(ctx, id)
	if errors.Is(err, pgx.ErrNoRows) {
		return pgx.ErrNoRows
	}

	return err
}
