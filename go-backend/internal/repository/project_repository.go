package repository

import (
	"context"
	"database/sql"
	"encoding/json"
	"errors"
	"fmt"
	"regexp"
	"strings"

	"github.com/azuhalz/my-portfolio/go-backend/internal/model"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgconn"
	"github.com/jackc/pgx/v5/pgxpool"
)

var ErrDuplicateSlug = errors.New("duplicate project slug")

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
	project.Images = make([]model.ProjectImage, 0)

	return project, nil
}

func (r *ProjectRepository) loadImages(
	ctx context.Context,
	project *model.Project,
) error {
	query := `
		SELECT
			id,
			project_id,
			mime_type,
			file_name,
			sort_order,
			created_at
		FROM project_images
		WHERE project_id = $1
		ORDER BY sort_order ASC, id ASC
	`

	rows, err := r.db.Query(ctx, query, project.ID)
	if err != nil {
		return fmt.Errorf("failed to get project images: %w", err)
	}
	defer rows.Close()

	for rows.Next() {
		var image model.ProjectImage
		var fileName sql.NullString

		err := rows.Scan(
			&image.ID,
			&image.ProjectID,
			&image.MimeType,
			&fileName,
			&image.SortOrder,
			&image.CreatedAt,
		)
		if err != nil {
			return fmt.Errorf("failed to scan project image: %w", err)
		}

		if fileName.Valid {
			image.FileName = &fileName.String
		}

		image.ImageURL = fmt.Sprintf(
			"/api/projects/%s/images/%d",
			project.Slug,
			image.ID,
		)

		project.Images = append(project.Images, image)
	}

	if err := rows.Err(); err != nil {
		return fmt.Errorf("failed to iterate project images: %w", err)
	}

	return nil
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

	for i := range projects {
		if err := r.loadImages(ctx, &projects[i]); err != nil {
			return nil, err
		}
	}

	return projects, nil
}

func (r *ProjectRepository) GetBySlug(
	ctx context.Context,
	slug string,
) (model.Project, error) {
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
		if errors.Is(err, pgx.ErrNoRows) {
			return model.Project{}, pgx.ErrNoRows
		}

		return model.Project{}, fmt.Errorf("failed to get project by slug: %w", err)
	}

	if err := r.loadImages(ctx, &project); err != nil {
		return model.Project{}, err
	}

	return project, nil
}

func (r *ProjectRepository) Create(
	ctx context.Context,
	slug string,
	request model.CreateProjectRequest,
) (model.Project, error) {
	query := `
		INSERT INTO projects (
			slug,
			title,
			type,
			role,
			timeline,
			overview,
			tech_stack,
			learnings,
			live_demo_url,
			github_url,
			sort_order,
			created_at,
			updated_at
		)
		VALUES (
			$1, $2, $3, $4, $5, $6, $7,
			COALESCE(NULLIF($8, '')::jsonb, '[]'::jsonb),
			$9, $10,
			COALESCE((SELECT MAX(sort_order) + 1 FROM projects), 0),
			NOW(),
			NOW()
		)
		RETURNING
			id,
			slug,
			title,
			type,
			role,
			timeline,
			overview,
			tech_stack,
			learnings,
			live_demo_url,
			github_url,
			sort_order,
			created_at,
			updated_at
	`

	project, err := scanProject(
		r.db.QueryRow(
			ctx,
			query,
			slug,
			request.Title,
			request.Type,
			request.Role,
			request.Timeline,
			request.Overview,
			request.TechStack,
			string(request.Learnings),
			request.LiveDemoURL,
			request.GitHubURL,
		),
	)

	if err != nil {
		var pgErr *pgconn.PgError

		if errors.As(err, &pgErr) && pgErr.Code == "23505" {
			return model.Project{}, ErrDuplicateSlug
		}

		return model.Project{}, fmt.Errorf("failed to create project: %w", err)
	}

	return project, nil
}

func (r *ProjectRepository) Update(
	ctx context.Context,
	slug string,
	request model.UpdateProjectRequest,
) (model.Project, error) {
	query := `
		UPDATE projects
		SET
			slug = $1,
			title = $2,
			type = $3,
			role = $4,
			timeline = $5,
			overview = $6,
			tech_stack = $7,
			learnings = COALESCE(NULLIF($8, '')::jsonb, '[]'::jsonb),
			live_demo_url = $9,
			github_url = $10,
			updated_at = NOW()
		WHERE slug = $11
		RETURNING
			id,
			slug,
			title,
			type,
			role,
			timeline,
			overview,
			tech_stack,
			learnings,
			live_demo_url,
			github_url,
			sort_order,
			created_at,
			updated_at
	`

	newSlug := strings.ToLower(strings.TrimSpace(request.Title))
	nonAlphanumeric := regexp.MustCompile(`[^a-z0-9]+`)
	newSlug = nonAlphanumeric.ReplaceAllString(newSlug, "-")
	newSlug = strings.Trim(newSlug, "-")

	project, err := scanProject(
		r.db.QueryRow(
			ctx,
			query,
			newSlug,
			request.Title,
			request.Type,
			request.Role,
			request.Timeline,
			request.Overview,
			request.TechStack,
			string(request.Learnings),
			request.LiveDemoURL,
			request.GitHubURL,
			slug,
		),
	)

	if err != nil {
		var pgErr *pgconn.PgError

		if errors.As(err, &pgErr) && pgErr.Code == "23505" {
			return model.Project{}, ErrDuplicateSlug
		}

		if errors.Is(err, pgx.ErrNoRows) {
			return model.Project{}, pgx.ErrNoRows
		}

		return model.Project{}, fmt.Errorf("failed to update project: %w", err)
	}

	if err := r.loadImages(ctx, &project); err != nil {
		return model.Project{}, err
	}

	return project, nil
}

func (r *ProjectRepository) Delete(
	ctx context.Context,
	slug string,
) error {
	query := `
		DELETE FROM projects
		WHERE slug = $1
	`

	commandTag, err := r.db.Exec(ctx, query, slug)
	if err != nil {
		return fmt.Errorf("failed to delete project: %w", err)
	}

	if commandTag.RowsAffected() == 0 {
		return pgx.ErrNoRows
	}

	return nil
}
