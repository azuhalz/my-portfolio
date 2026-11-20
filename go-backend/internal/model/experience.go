package model

import "time"

type Experience struct {
	ID           int16      `json:"id"`
	Type         string     `json:"type"`
	Title        string     `json:"title"`
	Organization string     `json:"organization"`
	StartDate    time.Time  `json:"start_date"`
	EndDate      *time.Time `json:"end_date"`
	Points       []string   `json:"points"`
	SortOrder    int        `json:"sort_order"`
	CreatedAt    time.Time  `json:"created_at"`
	UpdatedAt    time.Time  `json:"updated_at"`
}

type CreateExperienceRequest struct {
	Type         string     `json:"type"`
	Title        string     `json:"title"`
	Organization string     `json:"organization"`
	StartDate    time.Time  `json:"start_date"`
	EndDate      *time.Time `json:"end_date"`
	Points       []string   `json:"points"`
	SortOrder    int        `json:"sort_order"`
}

type UpdateExperienceRequest struct {
	Type         string     `json:"type"`
	Title        string     `json:"title"`
	Organization string     `json:"organization"`
	StartDate    time.Time  `json:"start_date"`
	EndDate      *time.Time `json:"end_date"`
	Points       []string   `json:"points"`
	SortOrder    int        `json:"sort_order"`
}

type ReorderExperiencesRequest struct {
	Type string  `json:"type"`
	IDs  []int16 `json:"ids"`
}
