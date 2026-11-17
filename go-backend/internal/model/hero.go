package model

import "time"

type Hero struct {
	ID              int16     `json:"id"`
	Greeting        string    `json:"greeting"`
	Name            string    `json:"name"`
	Headline        string    `json:"headline"`
	WorkButton      string    `json:"work_button"`
	ContactButton   string    `json:"contact_button"`
	ProfileImageURL string    `json:"profile_image_url"`
	Email           string    `json:"email"`
	LinkedInURL     string    `json:"linkedin_url"`
	GitHubURL       string    `json:"github_url"`
	UpdatedAt       time.Time `json:"updated_at"`
}

type UpdateHeroRequest struct {
	Greeting        string `json:"greeting"`
	Name            string `json:"name"`
	Headline        string `json:"headline"`
	WorkButton      string `json:"work_button"`
	ContactButton   string `json:"contact_button"`
	ProfileImageURL string `json:"profile_image_url"`
	Email           string `json:"email"`
	LinkedInURL     string `json:"linkedin_url"`
	GitHubURL       string `json:"github_url"`
}
