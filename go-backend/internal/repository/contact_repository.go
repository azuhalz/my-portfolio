package repository

import (
	"context"

	"github.com/azuhalz/my-portfolio/go-backend/internal/model"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/jackc/pgx/v5/pgxpool"
)

type ContactRepository struct {
	db *pgxpool.Pool
}

func NewContactRepository(db *pgxpool.Pool) *ContactRepository {
	return &ContactRepository{
		db: db,
	}
}

func (r *ContactRepository) GetContact(
	ctx context.Context,
) (*model.Contact, error) {
	var contact model.Contact

	query := `
		SELECT
			id,
			description,
			email,
			linkedin_url,
			github_url,
			cv_file_name,
			cv_content_type,
			updated_at
		FROM contact
		WHERE id = 1
	`

	err := r.db.QueryRow(ctx, query).Scan(
		&contact.ID,
		&contact.Description,
		&contact.Email,
		&contact.LinkedInURL,
		&contact.GitHubURL,
		&contact.CVFileName,
		&contact.CVContentType,
		&contact.UpdatedAt,
	)
	if err != nil {
		return nil, err
	}

	return &contact, nil
}

func (r *ContactRepository) UpdateContact(
	ctx context.Context,
	request model.UpdateContactRequest,
) (*model.Contact, error) {
	var contact model.Contact

	query := `
		UPDATE contact
		SET
			description = $1,
			email = $2,
			linkedin_url = $3,
			github_url = $4,
			updated_at = NOW()
		WHERE id = 1
		RETURNING
			id,
			description,
			email,
			linkedin_url,
			github_url,
			cv_file_name,
			cv_content_type,
			updated_at
	`

	err := r.db.QueryRow(
		ctx,
		query,
		request.Description,
		request.Email,
		request.LinkedInURL,
		request.GitHubURL,
	).Scan(
		&contact.ID,
		&contact.Description,
		&contact.Email,
		&contact.LinkedInURL,
		&contact.GitHubURL,
		&contact.CVFileName,
		&contact.CVContentType,
		&contact.UpdatedAt,
	)
	if err != nil {
		return nil, err
	}

	return &contact, nil
}

func (r *ContactRepository) UploadCV(
	ctx context.Context,
	request model.UploadCVRequest,
) error {
	query := `
		UPDATE contact
		SET
			cv_file_name = $1,
			cv_content_type = $2,
			cv_data = $3,
			updated_at = NOW()
		WHERE id = 1
	`

	result, err := r.db.Exec(
		ctx,
		query,
		request.FileName,
		request.ContentType,
		request.Data,
	)
	if err != nil {
		return err
	}

	if result.RowsAffected() == 0 {
		return pgx.ErrNoRows
	}

	return nil
}

func (r *ContactRepository) GetCV(
	ctx context.Context,
) (*model.UploadCVRequest, error) {
	var fileName pgtype.Text
	var contentType pgtype.Text
	var data []byte

	query := `
		SELECT
			cv_file_name,
			cv_content_type,
			cv_data
		FROM contact
		WHERE id = 1
	`

	err := r.db.QueryRow(ctx, query).Scan(
		&fileName,
		&contentType,
		&data,
	)
	if err != nil {
		return nil, err
	}

	if !fileName.Valid || !contentType.Valid || len(data) == 0 {
		return nil, pgx.ErrNoRows
	}

	return &model.UploadCVRequest{
		FileName:    fileName.String,
		ContentType: contentType.String,
		Data:        data,
	}, nil
}
