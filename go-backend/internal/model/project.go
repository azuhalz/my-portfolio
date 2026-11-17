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
	Images      json.RawMessage `json:"images"`
	LiveDemoURL *string         `json:"live_demo_url"`
	GitHubURL   *string         `json:"github_url"`
	SortOrder   int32           `json:"sort_order"`
	CreatedAt   time.Time       `json:"created_at"`
	UpdatedAt   time.Time       `json:"updated_at"`
}

type CreateProjectRequest struct {
    Title       string          `json:"title"`
    Type        string          `json:"type"`
    Role        *string         `json:"role"`
    Timeline    string          `json:"timeline"`
    Overview    string          `json:"overview"`
    TechStack   []string        `json:"tech_stack"`
    Learnings   json.RawMessage `json:"learnings"`
    Images      json.RawMessage `json:"images"`
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
    Images      json.RawMessage `json:"images"`
    LiveDemoURL *string         `json:"live_demo_url"`
    GitHubURL   *string         `json:"github_url"`
}