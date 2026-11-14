package repository

import (
	"context"
	"database/sql"
	"encoding/json"
	"fmt"

	"github.com/azuhalz/my-portfolio/go-backend/internal/model"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

type ProjectRepository struct {
	db *pgxpool.Pool
}

func NewProjectRepository(db *pgxpool.Pool) *ProjectRepository {
	return &ProjectRepository{
		db: db,
	}
}

func scanProject(row interface {
	Scan(dest ...any) error
}) (model.Project, error) {
	var project model.Project

	var role sql.NullString
	var liveDemoURL sql.NullString
	var githubURL sql.NullString
	var learnings []byte
	var images []byte

	err := row.Scan(
		&project.ID,
		&project.Slug,
		&project.Title,
		&project.Type,
		&role,
		&project.Timeline,
		&project.Overview,
		&project.TechStack,
		&learnings,
		&images,
		&liveDemoURL,
		&githubURL,
		&project.SortOrder,
		&project.CreatedAt,
		&project.UpdatedAt,
	)
	if err != nil {
		return model.Project{}, err
	}

	if role.Valid {
		project.Role = &role.String
	}

	if liveDemoURL.Valid {
		project.LiveDemoURL = &liveDemoURL.String
	}

	if githubURL.Valid {
		project.GitHubURL = &githubURL.String
	}

	project.Learnings = json.RawMessage(learnings)
	project.Images = json.RawMessage(images)

	return project, nil
}

func (r *ProjectRepository) GetAll(ctx context.Context) ([]model.Project, error) {
	query := `
		SELECT
			id,
			slug,
			title,
			type,
			role,
			timeline,
			overview,
			tech_stack,
			learnings,
			images,
			live_demo_url,
			github_url,
			sort_order,
			created_at,
			updated_at
		FROM projects
		ORDER BY sort_order ASC, id ASC
	`

	rows, err := r.db.Query(ctx, query)
	if err != nil {
		return nil, fmt.Errorf("failed to get projects: %w", err)
	}
	defer rows.Close()

	projects := make([]model.Project, 0)

	for rows.Next() {
		project, err := scanProject(rows)
		if err != nil {
			return nil, fmt.Errorf("failed to scan project: %w", err)
		}

		projects = append(projects, project)
	}

	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("failed to iterate projects: %w", err)
	}

	return projects, nil
}

func (r *ProjectRepository) GetBySlug(ctx context.Context, slug string) (model.Project, error) {
	query := `
		SELECT
			id,
			slug,
			title,
			type,
			role,
			timeline,
			overview,
			tech_stack,
			learnings,
			images,
			live_demo_url,
			github_url,
			sort_order,
			created_at,
			updated_at
		FROM projects
		WHERE slug = $1
	`

	project, err := scanProject(r.db.QueryRow(ctx, query, slug))
	if err != nil {
		if err == pgx.ErrNoRows {
			return model.Project{}, pgx.ErrNoRows
		}

		return model.Project{}, fmt.Errorf("failed to get project by slug: %w", err)
	}

	return project, nil
}