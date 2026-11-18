package model

import "time"

type Contact struct {
	ID            int16     `json:"id"`
	Description   string    `json:"description"`
	Email         string    `json:"email"`
	LinkedInURL   string    `json:"linkedin_url"`
	GitHubURL     string    `json:"github_url"`
	CVFileName    *string   `json:"cv_file_name"`
	CVContentType *string   `json:"cv_content_type"`
	UpdatedAt     time.Time `json:"updated_at"`
}

type UpdateContactRequest struct {
	Description string `json:"description"`
	Email       string `json:"email"`
	LinkedInURL string `json:"linkedin_url"`
	GitHubURL   string `json:"github_url"`
}

type UploadCVRequest struct {
	FileName    string
	ContentType string
	Data        []byte
}
