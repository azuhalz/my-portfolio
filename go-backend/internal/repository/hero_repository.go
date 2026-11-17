package repository

import (
	"context"
	"database/sql"
	"fmt"

	"github.com/azuhalz/my-portfolio/go-backend/internal/model"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

type HeroRepository struct {
	db *pgxpool.Pool
}

func NewHeroRepository(db *pgxpool.Pool) *HeroRepository {
	return &HeroRepository{
		db: db,
	}
}

func (r *HeroRepository) Get(ctx context.Context) (model.Hero, error) {
	query := `
		SELECT
			id,
			greeting,
			name,
			headline,
			work_button,
			contact_button,
			profile_image_url,
			email,
			linkedin_url,
			github_url,
			updated_at
		FROM hero
		ORDER BY id ASC
		LIMIT 1
	`

	var hero model.Hero

	err := r.db.QueryRow(ctx, query).Scan(
		&hero.ID,
		&hero.Greeting,
		&hero.Name,
		&hero.Headline,
		&hero.WorkButton,
		&hero.ContactButton,
		&hero.ProfileImageURL,
		&hero.Email,
		&hero.LinkedInURL,
		&hero.GitHubURL,
		&hero.UpdatedAt,
	)

	if err != nil {
		if err == pgx.ErrNoRows {
			return model.Hero{}, pgx.ErrNoRows
		}

		return model.Hero{}, fmt.Errorf("failed to get hero: %w", err)
	}

	return hero, nil
}

func (r *HeroRepository) Update(
	ctx context.Context,
	request model.UpdateHeroRequest,
) (model.Hero, error) {
	query := `
		UPDATE hero
		SET
			greeting = $1,
			name = $2,
			headline = $3,
			work_button = $4,
			contact_button = $5,
			profile_image_url = $6,
			email = $7,
			linkedin_url = $8,
			github_url = $9,
			updated_at = NOW()
		WHERE id = (
			SELECT id
			FROM hero
			ORDER BY id ASC
			LIMIT 1
		)
		RETURNING
			id,
			greeting,
			name,
			headline,
			work_button,
			contact_button,
			profile_image_url,
			email,
			linkedin_url,
			github_url,
			updated_at
	`

	var hero model.Hero

	err := r.db.QueryRow(
		ctx,
		query,
		request.Greeting,
		request.Name,
		request.Headline,
		request.WorkButton,
		request.ContactButton,
		request.ProfileImageURL,
		request.Email,
		request.LinkedInURL,
		request.GitHubURL,
	).Scan(
		&hero.ID,
		&hero.Greeting,
		&hero.Name,
		&hero.Headline,
		&hero.WorkButton,
		&hero.ContactButton,
		&hero.ProfileImageURL,
		&hero.Email,
		&hero.LinkedInURL,
		&hero.GitHubURL,
		&hero.UpdatedAt,
	)

	if err != nil {
		if err == pgx.ErrNoRows {
			return model.Hero{}, pgx.ErrNoRows
		}

		return model.Hero{}, fmt.Errorf("failed to update hero: %w", err)
	}

	return hero, nil
}

var _ = sql.ErrNoRows
