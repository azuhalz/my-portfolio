package model

import (
	"encoding/json"
	"time"
)

type Project struct {
	ID          int16           `json:"id"`
	Slug        string          `json:"slug"`
	Title       string          `json:"title"`
	Type        string          `json:"type"`
	Role        *string         `json:"role"`
	Timeline    string          `json:"timeline"`
	Overview    string          `json:"overview"`
	TechStack   []string        `json:"tech_stack"`
	Learnings   json.RawMessage `json:"learnings"`
	Images      []ProjectImage  `json:"images"`
	LiveDemoURL *string         `json:"live_demo_url"`
	GitHubURL   *string         `json:"github_url"`
	SortOrder   int32           `json:"sort_order"`
	CreatedAt   time.Time       `json:"created_at"`
	UpdatedAt   time.Time       `json:"updated_at"`
}

type ProjectImage struct {
	ID        int16     `json:"id"`
	ProjectID int16     `json:"project_id"`
	MimeType  string    `json:"mime_type"`
	FileName  *string   `json:"file_name"`
	SortOrder int16     `json:"sort_order"`
	CreatedAt time.Time `json:"created_at"`
	ImageURL  string    `json:"image_url"`
	ImageData []byte    `json:"-"`
}

type CreateProjectRequest struct {
	Title       string          `json:"title"`
	Type        string          `json:"type"`
	Role        *string         `json:"role"`
	Timeline    string          `json:"timeline"`
	Overview    string          `json:"overview"`
	TechStack   []string        `json:"tech_stack"`
	Learnings   json.RawMessage `json:"learnings"`
	LiveDemoURL *string         `json:"live_demo_url"`
	GitHubURL   *string         `json:"github_url"`
}

type UpdateProjectRequest struct {
	Title       string          `json:"title"`
	Type        string          `json:"type"`
	Role        *string         `json:"role"`
	Timeline    string          `json:"timeline"`
	Overview    string          `json:"overview"`
	TechStack   []string        `json:"tech_stack"`
	Learnings   json.RawMessage `json:"learnings"`
	LiveDemoURL *string         `json:"live_demo_url"`
	GitHubURL   *string         `json:"github_url"`
}
