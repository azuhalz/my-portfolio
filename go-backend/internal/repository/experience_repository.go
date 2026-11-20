package repository

import (
	"context"
	"encoding/json"
	"fmt"

	"github.com/azuhalz/my-portfolio/go-backend/internal/model"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/jackc/pgx/v5/pgxpool"
)

type ExperienceRepository struct {
	db *pgxpool.Pool
}

func NewExperienceRepository(db *pgxpool.Pool) *ExperienceRepository {
	return &ExperienceRepository{
		db: db,
	}
}

func scanExperience(row interface {
	Scan(dest ...any) error
}) (model.Experience, error) {
	var experience model.Experience
	var endDate pgtype.Date
	var points []byte

	err := row.Scan(
		&experience.ID,
		&experience.Type,
		&experience.Title,
		&experience.Organization,
		&experience.StartDate,
		&endDate,
		&points,
		&experience.SortOrder,
		&experience.CreatedAt,
		&experience.UpdatedAt,
	)
	if err != nil {
		return model.Experience{}, err
	}

	if endDate.Valid {
		experience.EndDate = &endDate.Time
	}

	if len(points) > 0 {
		if err := json.Unmarshal(points, &experience.Points); err != nil {
			return model.Experience{}, fmt.Errorf(
				"failed to decode experience points: %w", err,
			)
		}
	}

	if experience.Points == nil {
		experience.Points = []string{}
	}

	return experience, nil
}

const experienceColumns = `
	id,
	type,
	title,
	organization,
	start_date,
	end_date,
	points,
	sort_order,
	created_at,
	updated_at
`

func (r *ExperienceRepository) GetAll(
	ctx context.Context,
	experienceType string,
) ([]model.Experience, error) {
	query := `
		SELECT ` + experienceColumns + `
		FROM experiences
		WHERE ($1 = '' OR type = $1)
		ORDER BY sort_order ASC, id ASC
	`

	rows, err := r.db.Query(ctx, query, experienceType)
	if err != nil {
		return nil, fmt.Errorf("failed to get experiences: %w", err)
	}
	defer rows.Close()

	experiences := make([]model.Experience, 0)

	for rows.Next() {
		experience, err := scanExperience(rows)
		if err != nil {
			return nil, fmt.Errorf("failed to scan experience: %w", err)
		}

		experiences = append(experiences, experience)
	}

	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("failed to iterate experiences: %w", err)
	}

	return experiences, nil
}

func (r *ExperienceRepository) GetByID(
	ctx context.Context,
	id int16,
) (model.Experience, error) {
	query := `
		SELECT ` + experienceColumns + `
		FROM experiences
		WHERE id = $1
	`

	experience, err := scanExperience(
		r.db.QueryRow(ctx, query, id),
	)
	if err != nil {
		if err == pgx.ErrNoRows {
			return model.Experience{}, pgx.ErrNoRows
		}

		return model.Experience{}, fmt.Errorf(
			"failed to get experience: %w", err,
		)
	}

	return experience, nil
}

func (r *ExperienceRepository) Create(
	ctx context.Context,
	request model.CreateExperienceRequest,
) (model.Experience, error) {
	pointsJSON, err := json.Marshal(request.Points)
	if err != nil {
		return model.Experience{}, fmt.Errorf(
			"failed to encode experience points: %w", err,
		)
	}

	query := `INSERT INTO experiences (
		type, title, organization, start_date, end_date, points,
		sort_order, created_at, updated_at
	) VALUES (
		$1, $2, $3, $4, $5, $6::jsonb,
		COALESCE(
			(SELECT MAX(sort_order) + 1 FROM experiences WHERE type = $1::varchar),
			0
		),
		NOW(), NOW()
	) RETURNING ` + experienceColumns

	experience, err := scanExperience(r.db.QueryRow(
		ctx,
		query,
		request.Type,
		request.Title,
		request.Organization,
		request.StartDate,
		request.EndDate,
		string(pointsJSON),
	))

	if err != nil {
		return model.Experience{}, fmt.Errorf(
			"failed to create experience: %w", err,
		)
	}

	return experience, nil
}

func (r *ExperienceRepository) Update(
	ctx context.Context,
	id int16,
	request model.UpdateExperienceRequest,
) (model.Experience, error) {
	pointsJSON, err := json.Marshal(request.Points)
	if err != nil {
		return model.Experience{}, fmt.Errorf(
			"failed to encode experience points: %w", err,
		)
	}

	query := `
		UPDATE experiences
		SET
			type = $1,
			title = $2,
			organization = $3,
			start_date = $4,
			end_date = $5,
			points = $6::jsonb,
			sort_order = $7,
			updated_at = NOW()
		WHERE id = $8
		RETURNING ` + experienceColumns

	experience, err := scanExperience(
		r.db.QueryRow(
			ctx,
			query,
			request.Type,
			request.Title,
			request.Organization,
			request.StartDate,
			request.EndDate,
			string(pointsJSON),
			request.SortOrder,
			id,
		),
	)
	if err != nil {
		if err == pgx.ErrNoRows {
			return model.Experience{}, pgx.ErrNoRows
		}

		return model.Experience{}, fmt.Errorf(
			"failed to update experience: %w", err,
		)
	}

	return experience, nil
}

func (r *ExperienceRepository) Delete(
	ctx context.Context,
	id int16,
) error {
	query := `
		DELETE FROM experiences
		WHERE id = $1
	`

	result, err := r.db.Exec(ctx, query, id)
	if err != nil {
		return fmt.Errorf("failed to delete experience: %w", err)
	}

	if result.RowsAffected() == 0 {
		return pgx.ErrNoRows
	}

	return nil
}

func (r *ExperienceRepository) Reorder(
	ctx context.Context,
	experienceType string,
	ids []int16,
) error {
	tx, err := r.db.Begin(ctx)
	if err != nil {
		return fmt.Errorf("failed to begin reorder transaction: %w", err)
	}
	defer tx.Rollback(ctx)

	query := `
		UPDATE experiences AS e
		SET
			sort_order = ordered.position - 1,
			updated_at = NOW()
		FROM unnest($1::smallint[]) WITH ORDINALITY
			AS ordered(id, position)
		WHERE e.id = ordered.id
		AND e.type = $2
	`

	commandTag, err := tx.Exec(ctx, query, ids, experienceType)
	if err != nil {
		return fmt.Errorf("failed to reorder experiences: %w", err)
	}

	if commandTag.RowsAffected() != int64(len(ids)) {
		return fmt.Errorf("experience count does not match submitted order")
	}

	if err := tx.Commit(ctx); err != nil {
		return fmt.Errorf("failed to commit experience order: %w", err)
	}

	return nil
}
