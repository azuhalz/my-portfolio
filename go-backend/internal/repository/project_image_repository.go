package repository

import (
	"context"
	"database/sql"
	"errors"
	"fmt"

	"github.com/azuhalz/my-portfolio/go-backend/internal/model"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

type ProjectImageRepository struct {
	db *pgxpool.Pool
}

func NewProjectImageRepository(db *pgxpool.Pool) *ProjectImageRepository {
	return &ProjectImageRepository{
		db: db,
	}
}

func (r *ProjectImageRepository) Create(
	ctx context.Context,
	projectID int16,
	imageData []byte,
	mimeType string,
	fileName *string,
	sortOrder int16,
) (model.ProjectImage, error) {
	query := `
		INSERT INTO project_images (
			project_id,
			image_data,
			mime_type,
			file_name,
			sort_order
		)
		VALUES ($1, $2, $3, $4, $5)
		RETURNING
			id,
			project_id,
			mime_type,
			file_name,
			sort_order,
			created_at
	`

	var image model.ProjectImage
	var nullableFileName sql.NullString

	err := r.db.QueryRow(
		ctx,
		query,
		projectID,
		imageData,
		mimeType,
		fileName,
		sortOrder,
	).Scan(
		&image.ID,
		&image.ProjectID,
		&image.MimeType,
		&nullableFileName,
		&image.SortOrder,
		&image.CreatedAt,
	)

	if err != nil {
		return model.ProjectImage{}, fmt.Errorf(
			"failed to create project image: %w",
			err,
		)
	}

	if nullableFileName.Valid {
		image.FileName = &nullableFileName.String
	}

	return image, nil
}

func (r *ProjectImageRepository) GetByID(
	ctx context.Context,
	projectID int16,
	imageID int16,
) (model.ProjectImage, error) {
	query := `
		SELECT
			id,
			project_id,
			image_data,
			mime_type,
			file_name,
			sort_order,
			created_at
		FROM project_images
		WHERE project_id = $1 AND id = $2
	`

	var image model.ProjectImage
	var nullableFileName sql.NullString

	err := r.db.QueryRow(
		ctx,
		query,
		projectID,
		imageID,
	).Scan(
		&image.ID,
		&image.ProjectID,
		&image.ImageData,
		&image.MimeType,
		&nullableFileName,
		&image.SortOrder,
		&image.CreatedAt,
	)

	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return model.ProjectImage{}, pgx.ErrNoRows
		}

		return model.ProjectImage{}, fmt.Errorf(
			"failed to get project image: %w",
			err,
		)
	}

	if nullableFileName.Valid {
		image.FileName = &nullableFileName.String
	}

	return image, nil
}

func (r *ProjectImageRepository) Delete(
	ctx context.Context,
	projectID int16,
	imageID int16,
) error {
	query := `
		DELETE FROM project_images
		WHERE project_id = $1 AND id = $2
	`

	commandTag, err := r.db.Exec(
		ctx,
		query,
		projectID,
		imageID,
	)

	if err != nil {
		return fmt.Errorf(
			"failed to delete project image: %w",
			err,
		)
	}

	if commandTag.RowsAffected() == 0 {
		return pgx.ErrNoRows
	}

	return nil
}
