package repository

import (
	"context"
	"fmt"

	"github.com/azuhalz/my-portfolio/go-backend/internal/model"
	"github.com/jackc/pgx/v5/pgxpool"
)

type PortfolioViewRepository struct {
	db *pgxpool.Pool
}

func NewPortfolioViewRepository(db *pgxpool.Pool) *PortfolioViewRepository {
	return &PortfolioViewRepository{
		db: db,
	}
}

func (r *PortfolioViewRepository) Create(ctx context.Context, view *model.PortfolioView) error {
	query := `
		INSERT INTO portfolio_views DEFAULT VALUES
		RETURNING id, viewed_at
	`

	err := r.db.QueryRow(ctx, query).Scan(
		&view.ID,
		&view.ViewedAt,
	)
	if err != nil {
		return fmt.Errorf("failed to create portfolio view: %w", err)
	}

	return nil
}

func (r *PortfolioViewRepository) CountAll(ctx context.Context) (int64, error) {
	query := `
		SELECT COUNT(*)
		FROM portfolio_views
	`

	var total int64

	err := r.db.QueryRow(ctx, query).Scan(&total)
	if err != nil {
		return 0, fmt.Errorf("failed to count portfolio views: %w", err)
	}

	return total, nil
}
