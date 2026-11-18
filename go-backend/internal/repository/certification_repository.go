package repository

import (
	"context"
	"fmt"

	"github.com/azuhalz/my-portfolio/go-backend/internal/model"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/jackc/pgx/v5/pgxpool"
)

type CertificationRepository struct {
	db *pgxpool.Pool
}

func NewCertificationRepository(db *pgxpool.Pool) *CertificationRepository {
	return &CertificationRepository{db: db}
}

const certificationColumns = `
	id, name, issuer, issued_date, expiry_date,
	credential_url, sort_order, created_at, updated_at
`

func scanCertification(row interface{ Scan(dest ...any) error }) (model.Certification, error) {
	var certification model.Certification
	var expiryDate pgtype.Date

	err := row.Scan(
		&certification.ID,
		&certification.Name,
		&certification.Issuer,
		&certification.IssuedDate,
		&expiryDate,
		&certification.CredentialURL,
		&certification.SortOrder,
		&certification.CreatedAt,
		&certification.UpdatedAt,
	)

	if err != nil {
		return model.Certification{}, err
	}

	if expiryDate.Valid {
		certification.ExpiryDate = &expiryDate.Time
	}

	return certification, nil
}

func (r *CertificationRepository) GetAll(ctx context.Context) ([]model.Certification, error) {
	query := `SELECT ` + certificationColumns + `
		FROM certifications
		ORDER BY sort_order ASC, id ASC`

	rows, err := r.db.Query(ctx, query)
	if err != nil {
		return nil, fmt.Errorf("failed to get certifications: %w", err)
	}
	defer rows.Close()

	certifications := make([]model.Certification, 0)

	for rows.Next() {
		certification, err := scanCertification(rows)
		if err != nil {
			return nil, fmt.Errorf("failed to scan certification: %w", err)
		}

		certifications = append(certifications, certification)
	}

	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("failed to iterate certifications: %w", err)
	}

	return certifications, nil
}

func (r *CertificationRepository) GetByID(ctx context.Context, id int16) (model.Certification, error) {
	query := `SELECT ` + certificationColumns + `
		FROM certifications
		WHERE id = $1`

	certification, err := scanCertification(r.db.QueryRow(ctx, query, id))
	if err != nil {
		if err == pgx.ErrNoRows {
			return model.Certification{}, pgx.ErrNoRows
		}

		return model.Certification{}, fmt.Errorf("failed to get certification: %w", err)
	}

	return certification, nil
}

func (r *CertificationRepository) Create(ctx context.Context, request model.CreateCertificationRequest) (model.Certification, error) {
	query := `INSERT INTO certifications (
		name, issuer, issued_date, expiry_date,
		credential_url, sort_order, created_at, updated_at
	) VALUES (
		$1, $2, $3, $4, $5,
		COALESCE((SELECT MAX(sort_order) + 1 FROM certifications), 0),
		NOW(), NOW()
	) RETURNING ` + certificationColumns

	certification, err := scanCertification(r.db.QueryRow(ctx, query,
		request.Name,
		request.Issuer,
		request.IssuedDate,
		request.ExpiryDate,
		request.CredentialURL,
	))

	if err != nil {
		return model.Certification{}, fmt.Errorf("failed to create certification: %w", err)
	}

	return certification, nil
}

func (r *CertificationRepository) Update(ctx context.Context, id int16, request model.UpdateCertificationRequest) (model.Certification, error) {
	query := `UPDATE certifications SET
		name = $1,
		issuer = $2,
		issued_date = $3,
		expiry_date = $4,
		credential_url = $5,
		sort_order = $6,
		updated_at = NOW()
		WHERE id = $7
		RETURNING ` + certificationColumns

	certification, err := scanCertification(r.db.QueryRow(ctx, query,
		request.Name,
		request.Issuer,
		request.IssuedDate,
		request.ExpiryDate,
		request.CredentialURL,
		request.SortOrder,
		id,
	))

	if err != nil {
		if err == pgx.ErrNoRows {
			return model.Certification{}, pgx.ErrNoRows
		}

		return model.Certification{}, fmt.Errorf("failed to update certification: %w", err)
	}

	return certification, nil
}

func (r *CertificationRepository) Delete(ctx context.Context, id int16) error {
	result, err := r.db.Exec(ctx,
		`DELETE FROM certifications WHERE id = $1`,
		id,
	)

	if err != nil {
		return fmt.Errorf("failed to delete certification: %w", err)
	}

	if result.RowsAffected() == 0 {
		return pgx.ErrNoRows
	}

	return nil
}
