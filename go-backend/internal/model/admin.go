package model

import "time"

type Admin struct {
	ID        int16     `json:"id"`
	Name      string    `json:"name"`
	Email     string    `json:"email"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

type UpdateAdminProfileRequest struct {
	Name  string `json:"name"`
	Email string `json:"email"`
}

type UpdateAdminPasswordRequest struct {
	CurrentPassword string `json:"current_password"`
	NewPassword     string `json:"new_password"`
}
