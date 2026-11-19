package repository

import (
	"context"

	"github.com/azuhalz/my-portfolio/go-backend/internal/model"
	"github.com/jackc/pgx/v5/pgxpool"
)

type AuthRepository struct {
	db *pgxpool.Pool
}

func NewAuthRepository(db *pgxpool.Pool) *AuthRepository {
	return &AuthRepository{db: db}
}

func (r *AuthRepository) GetAdminByEmail(
	ctx context.Context,
	email string,
) (*model.Admin, string, error) {
	query := `
		SELECT id, name, email, password_hash, created_at, updated_at
		FROM admin_users
		WHERE email = $1
		LIMIT 1
	`

	var admin model.Admin
	var passwordHash string

	err := r.db.QueryRow(ctx, query, email).Scan(
		&admin.ID,
		&admin.Name,
		&admin.Email,
		&passwordHash,
		&admin.CreatedAt,
		&admin.UpdatedAt,
	)
	if err != nil {
		return nil, "", err
	}

	return &admin, passwordHash, nil
}
