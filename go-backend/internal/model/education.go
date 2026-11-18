package model

import "time"

type Education struct {
	ID           int16     `json:"id"`
	Institution  string    `json:"institution"`
	Level        string    `json:"level"`
	FieldOfStudy string    `json:"field_of_study"`
	StartYear    int16     `json:"start_year"`
	EndYear      *int16    `json:"end_year"`
	IsCurrent    bool      `json:"is_current"`
	GPA          *string   `json:"gpa"`
	SortOrder    int       `json:"sort_order"`
	CreatedAt    time.Time `json:"created_at"`
	UpdatedAt    time.Time `json:"updated_at"`
}

type CreateEducationRequest struct {
	Institution  string  `json:"institution"`
	Level        string  `json:"level"`
	FieldOfStudy string  `json:"field_of_study"`
	StartYear    int16   `json:"start_year"`
	EndYear      *int16  `json:"end_year"`
	IsCurrent    bool    `json:"is_current"`
	GPA          *string `json:"gpa"`
	SortOrder    int     `json:"sort_order"`
}

type UpdateEducationRequest struct {
	Institution  string  `json:"institution"`
	Level        string  `json:"level"`
	FieldOfStudy string  `json:"field_of_study"`
	StartYear    int16   `json:"start_year"`
	EndYear      *int16  `json:"end_year"`
	IsCurrent    bool    `json:"is_current"`
	GPA          *string `json:"gpa"`
	SortOrder    int     `json:"sort_order"`
}
