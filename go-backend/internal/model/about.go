package model

import "time"

type About struct {
	ID                 int16     `json:"id"`
	Description        string    `json:"description"`
	Location           string    `json:"location"`
	Phone              string    `json:"phone"`
	Email              string    `json:"email"`
	LinkedInURL        string    `json:"linkedin_url"`
	GitHubURL          string    `json:"github_url"`
	AvailabilityStatus string    `json:"availability_status"`
	UpdatedAt          time.Time `json:"updated_at"`
}

type UpdateAboutRequest struct {
	Description        string `json:"description"`
	Location           string `json:"location"`
	Phone              string `json:"phone"`
	Email              string `json:"email"`
	LinkedInURL        string `json:"linkedin_url"`
	GitHubURL          string `json:"github_url"`
	AvailabilityStatus string `json:"availability_status"`
}
