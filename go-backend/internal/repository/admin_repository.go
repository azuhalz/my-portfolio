package repository

import (
	"context"

	"github.com/azuhalz/my-portfolio/go-backend/internal/model"
	"github.com/jackc/pgx/v5/pgxpool"
)

type AdminRepository struct {
	db *pgxpool.Pool
}

func NewAdminRepository(db *pgxpool.Pool) *AdminRepository {
	return &AdminRepository{db: db}
}

func (r *AdminRepository) Get(ctx context.Context) (*model.Admin, error) {
	query := `
		SELECT id, name, email, created_at, updated_at
		FROM admin_users
		ORDER BY id
		LIMIT 1
	`

	var admin model.Admin

	err := r.db.QueryRow(ctx, query).Scan(
		&admin.ID,
		&admin.Name,
		&admin.Email,
		&admin.CreatedAt,
		&admin.UpdatedAt,
	)
	if err != nil {
		return nil, err
	}

	return &admin, nil
}

func (r *AdminRepository) UpdateProfile(
	ctx context.Context,
	name string,
	email string,
) (*model.Admin, error) {
	query := `
		UPDATE admin_users
		SET name = $1,
			email = $2,
			updated_at = NOW()
		WHERE id = (
			SELECT id FROM admin_users
			ORDER BY id
			LIMIT 1
		)
		RETURNING id, name, email, created_at, updated_at
	`

	var admin model.Admin

	err := r.db.QueryRow(ctx, query, name, email).Scan(
		&admin.ID,
		&admin.Name,
		&admin.Email,
		&admin.CreatedAt,
		&admin.UpdatedAt,
	)
	if err != nil {
		return nil, err
	}

	return &admin, nil
}

func (r *AdminRepository) GetPasswordHash(ctx context.Context) (int16, string, error) {
	query := `
		SELECT id, password_hash
		FROM admin_users
		ORDER BY id
		LIMIT 1
	`

	var id int16
	var passwordHash string

	err := r.db.QueryRow(ctx, query).Scan(&id, &passwordHash)
	if err != nil {
		return 0, "", err
	}

	return id, passwordHash, nil
}

func (r *AdminRepository) UpdatePasswordHash(
	ctx context.Context,
	id int16,
	passwordHash string,
) error {
	query := `
		UPDATE admin_users
		SET password_hash = $1,
			updated_at = NOW()
		WHERE id = $2
	`

	_, err := r.db.Exec(ctx, query, passwordHash, id)
	return err
}
