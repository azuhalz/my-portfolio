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
			CASE
				WHEN profile_image_data IS NOT NULL
				THEN '/api/hero/image'
				ELSE profile_image_url
			END,
			profile_image_mime_type,
			profile_image_file_name,
			email,
			linkedin_url,
			github_url,
			updated_at
		FROM hero
		ORDER BY id ASC
		LIMIT 1
	`

	var hero model.Hero
	var mimeType sql.NullString
	var fileName sql.NullString

	err := r.db.QueryRow(ctx, query).Scan(
		&hero.ID,
		&hero.Greeting,
		&hero.Name,
		&hero.Headline,
		&hero.WorkButton,
		&hero.ContactButton,
		&hero.ProfileImageURL,
		&mimeType,
		&fileName,
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

	setHeroImageMetadata(&hero, mimeType, fileName)

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
			SELECT id FROM hero ORDER BY id ASC LIMIT 1
		)
		RETURNING
			id,
			greeting,
			name,
			headline,
			work_button,
			contact_button,
			CASE
				WHEN profile_image_data IS NOT NULL
				THEN '/api/hero/image'
				ELSE profile_image_url
			END,
			profile_image_mime_type,
			profile_image_file_name,
			email,
			linkedin_url,
			github_url,
			updated_at
	`

	var hero model.Hero
	var mimeType sql.NullString
	var fileName sql.NullString

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
		&mimeType,
		&fileName,
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

	setHeroImageMetadata(&hero, mimeType, fileName)

	return hero, nil
}

func (r *HeroRepository) UpdateImage(
	ctx context.Context,
	imageData []byte,
	mimeType string,
	fileName *string,
) (model.Hero, error) {
	query := `
		UPDATE hero
		SET
			profile_image_data = $1,
			profile_image_mime_type = $2,
			profile_image_file_name = $3,
			updated_at = NOW()
		WHERE id = (
			SELECT id FROM hero ORDER BY id ASC LIMIT 1
		)
		RETURNING
			id,
			profile_image_data,
			profile_image_mime_type,
			profile_image_file_name
	`

	var hero model.Hero

	err := r.db.QueryRow(
		ctx,
		query,
		imageData,
		mimeType,
		fileName,
	).Scan(
		&hero.ID,
		&hero.ProfileImageData,
		&hero.ProfileImageMimeType,
		&hero.ProfileImageFileName,
	)

	if err != nil {
		if err == pgx.ErrNoRows {
			return model.Hero{}, pgx.ErrNoRows
		}
		return model.Hero{}, fmt.Errorf("failed to update hero image: %w", err)
	}

	hero.ProfileImageURL = "/api/hero/image"

	return hero, nil
}

func (r *HeroRepository) GetImage(
	ctx context.Context,
) (model.Hero, error) {
	query := `
		SELECT
			id,
			profile_image_data,
			profile_image_mime_type,
			profile_image_file_name
		FROM hero
		ORDER BY id ASC
		LIMIT 1
	`

	var hero model.Hero

	err := r.db.QueryRow(ctx, query).Scan(
		&hero.ID,
		&hero.ProfileImageData,
		&hero.ProfileImageMimeType,
		&hero.ProfileImageFileName,
	)

	if err != nil {
		if err == pgx.ErrNoRows {
			return model.Hero{}, pgx.ErrNoRows
		}
		return model.Hero{}, fmt.Errorf("failed to get hero image: %w", err)
	}

	if len(hero.ProfileImageData) == 0 {
		return model.Hero{}, pgx.ErrNoRows
	}

	hero.ProfileImageURL = "/api/hero/image"

	return hero, nil
}

func (r *HeroRepository) DeleteImage(ctx context.Context) error {
	query := `
		UPDATE hero
		SET
			profile_image_data = NULL,
			profile_image_mime_type = NULL,
			profile_image_file_name = NULL,
			updated_at = NOW()
		WHERE id = (
			SELECT id FROM hero ORDER BY id ASC LIMIT 1
		)
	`

	result, err := r.db.Exec(ctx, query)
	if err != nil {
		return fmt.Errorf("failed to delete hero image: %w", err)
	}

	if result.RowsAffected() == 0 {
		return pgx.ErrNoRows
	}

	return nil
}

func setHeroImageMetadata(
	hero *model.Hero,
	mimeType sql.NullString,
	fileName sql.NullString,
) {
	if mimeType.Valid {
		hero.ProfileImageMimeType = &mimeType.String
	}

	if fileName.Valid {
		hero.ProfileImageFileName = &fileName.String
	}
}
