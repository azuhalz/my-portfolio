package model

import "time"

type Message struct {
	ID         int16     `json:"id"`
	Name       string    `json:"name"`
	Email      string    `json:"email"`
	Message    string    `json:"message"`
	ReceivedAt time.Time `json:"received_at"`
	IsRead     bool      `json:"is_read"`
	IsArchived bool      `json:"is_archived"`
}

type CreateMessageRequest struct {
	Name    string `json:"name"`
	Email   string `json:"email"`
	Message string `json:"message"`
}

type UpdateMessageStatusRequest struct {
	IsRead     *bool `json:"is_read"`
	IsArchived *bool `json:"is_archived"`
}
