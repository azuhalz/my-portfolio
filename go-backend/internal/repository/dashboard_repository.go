package repository

import (
	"context"
	"fmt"

	"github.com/azuhalz/my-portfolio/go-backend/internal/model"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/jackc/pgx/v5/pgxpool"
)

type DashboardRepository struct {
	db *pgxpool.Pool
}

func NewDashboardRepository(db *pgxpool.Pool) *DashboardRepository {
	return &DashboardRepository{
		db: db,
	}
}

func (r *DashboardRepository) GetStats(ctx context.Context) (*model.DashboardStats, error) {
	stats := &model.DashboardStats{
		RecentMessages: []model.Message{},
	}

	query := `
		SELECT
			(SELECT COUNT(*) FROM projects),
			(SELECT COUNT(*) FROM portfolio_views),
			(SELECT COUNT(*) FROM messages),
			(
				SELECT MAX(updated_at)
				FROM (
					SELECT updated_at FROM hero
					UNION ALL
					SELECT updated_at FROM about
					UNION ALL
					SELECT updated_at FROM contact
					UNION ALL
					SELECT updated_at FROM projects
					UNION ALL
					SELECT updated_at FROM experiences
					UNION ALL
					SELECT updated_at FROM educations
					UNION ALL
					SELECT updated_at FROM certifications
				) AS content_updates
			)
	`

	var lastUpdated pgtype.Timestamptz

	err := r.db.QueryRow(ctx, query).Scan(
		&stats.TotalProjects,
		&stats.TotalViews,
		&stats.TotalMessages,
		&lastUpdated,
	)
	if err != nil {
		return nil, fmt.Errorf("failed to get dashboard stats: %w", err)
	}

	if lastUpdated.Valid {
		stats.LastUpdated = &lastUpdated.Time
	}

	messageQuery := `
		SELECT
			id,
			name,
			email,
			message,
			received_at,
			is_read,
			is_archived
		FROM messages
		WHERE is_archived = FALSE
		ORDER BY received_at DESC
		LIMIT 4
	`

	rows, err := r.db.Query(ctx, messageQuery)
	if err != nil {
		return nil, fmt.Errorf("failed to get recent messages: %w", err)
	}
	defer rows.Close()

	for rows.Next() {
		var message model.Message

		err := rows.Scan(
			&message.ID,
			&message.Name,
			&message.Email,
			&message.Message,
			&message.ReceivedAt,
			&message.IsRead,
			&message.IsArchived,
		)
		if err != nil {
			return nil, fmt.Errorf("failed to scan recent message: %w", err)
		}

		stats.RecentMessages = append(stats.RecentMessages, message)
	}

	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("failed to iterate recent messages: %w", err)
	}

	return stats, nil
}
