package repository

import (
	"context"
	"fmt"

	"github.com/azuhalz/my-portfolio/go-backend/internal/model"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

type AboutRepository struct {
	db *pgxpool.Pool
}

func NewAboutRepository(db *pgxpool.Pool) *AboutRepository {
	return &AboutRepository{
		db: db,
	}
}

func (r *AboutRepository) Get(ctx context.Context) (model.About, error) {
	query := `
		SELECT
			id,
			description,
			location,
			phone,
			email,
			linkedin_url,
			github_url,
			availability_status,
			updated_at
		FROM about
		ORDER BY id ASC
		LIMIT 1
	`

	var about model.About

	err := r.db.QueryRow(ctx, query).Scan(
		&about.ID,
		&about.Description,
		&about.Location,
		&about.Phone,
		&about.Email,
		&about.LinkedInURL,
		&about.GitHubURL,
		&about.AvailabilityStatus,
		&about.UpdatedAt,
	)
	if err != nil {
		if err == pgx.ErrNoRows {
			return model.About{}, pgx.ErrNoRows
		}

		return model.About{}, fmt.Errorf("failed to get about: %w", err)
	}

	return about, nil
}

func (r *AboutRepository) Update(
	ctx context.Context,
	request model.UpdateAboutRequest,
) (model.About, error) {
	query := `
		UPDATE about
		SET
			description = $1,
			location = $2,
			phone = $3,
			email = $4,
			linkedin_url = $5,
			github_url = $6,
			availability_status = $7,
			updated_at = NOW()
		WHERE id = (
			SELECT id
			FROM about
			ORDER BY id ASC
			LIMIT 1
		)
		RETURNING
			id,
			description,
			location,
			phone,
			email,
			linkedin_url,
			github_url,
			availability_status,
			updated_at
	`

	var about model.About

	err := r.db.QueryRow(
		ctx,
		query,
		request.Description,
		request.Location,
		request.Phone,
		request.Email,
		request.LinkedInURL,
		request.GitHubURL,
		request.AvailabilityStatus,
	).Scan(
		&about.ID,
		&about.Description,
		&about.Location,
		&about.Phone,
		&about.Email,
		&about.LinkedInURL,
		&about.GitHubURL,
		&about.AvailabilityStatus,
		&about.UpdatedAt,
	)
	if err != nil {
		if err == pgx.ErrNoRows {
			return model.About{}, pgx.ErrNoRows
		}

		return model.About{}, fmt.Errorf("failed to update about: %w", err)
	}

	return about, nil
}
