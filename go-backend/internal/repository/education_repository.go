package repository

import (
	"context"
	"fmt"

	"github.com/azuhalz/my-portfolio/go-backend/internal/model"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

type EducationRepository struct {
	db *pgxpool.Pool
}

func NewEducationRepository(db *pgxpool.Pool) *EducationRepository {
	return &EducationRepository{db: db}
}

const educationColumns = `
	id, institution, level, field_of_study, start_year,
	end_year, is_current, gpa, sort_order, created_at, updated_at
`

func scanEducation(row interface{ Scan(dest ...any) error }) (model.Education, error) {
	var education model.Education

	err := row.Scan(
		&education.ID,
		&education.Institution,
		&education.Level,
		&education.FieldOfStudy,
		&education.StartYear,
		&education.EndYear,
		&education.IsCurrent,
		&education.GPA,
		&education.SortOrder,
		&education.CreatedAt,
		&education.UpdatedAt,
	)

	if err != nil {
		return model.Education{}, err
	}

	return education, nil
}

func (r *EducationRepository) GetAll(ctx context.Context) ([]model.Education, error) {
	query := `SELECT ` + educationColumns + `
		FROM educations
		ORDER BY sort_order ASC, id ASC`

	rows, err := r.db.Query(ctx, query)
	if err != nil {
		return nil, fmt.Errorf("failed to get educations: %w", err)
	}
	defer rows.Close()

	educations := make([]model.Education, 0)

	for rows.Next() {
		education, err := scanEducation(rows)
		if err != nil {
			return nil, fmt.Errorf("failed to scan education: %w", err)
		}

		educations = append(educations, education)
	}

	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("failed to iterate educations: %w", err)
	}

	return educations, nil
}

func (r *EducationRepository) GetByID(ctx context.Context, id int16) (model.Education, error) {
	query := `SELECT ` + educationColumns + `
		FROM educations
		WHERE id = $1`

	education, err := scanEducation(r.db.QueryRow(ctx, query, id))
	if err != nil {
		if err == pgx.ErrNoRows {
			return model.Education{}, pgx.ErrNoRows
		}

		return model.Education{}, fmt.Errorf("failed to get education: %w", err)
	}

	return education, nil
}

func (r *EducationRepository) Create(ctx context.Context, request model.CreateEducationRequest) (model.Education, error) {
	query := `INSERT INTO educations (
		institution, level, field_of_study, start_year,
		end_year, is_current, gpa, sort_order, created_at, updated_at
	) VALUES (
		$1, $2, $3, $4, $5, $6, $7,
		COALESCE(
			(SELECT MAX(sort_order) + 1 FROM educations),
			0
		),
		NOW(), NOW()
	) RETURNING ` + educationColumns

	education, err := scanEducation(r.db.QueryRow(ctx, query,
		request.Institution,
		request.Level,
		request.FieldOfStudy,
		request.StartYear,
		request.EndYear,
		request.IsCurrent,
		request.GPA,
	))

	if err != nil {
		return model.Education{}, fmt.Errorf("failed to create education: %w", err)
	}

	return education, nil
}

func (r *EducationRepository) Update(ctx context.Context, id int16, request model.UpdateEducationRequest) (model.Education, error) {
	query := `UPDATE educations SET
		institution = $1,
		level = $2,
		field_of_study = $3,
		start_year = $4,
		end_year = $5,
		is_current = $6,
		gpa = $7,
		sort_order = $8,
		updated_at = NOW()
		WHERE id = $9
		RETURNING ` + educationColumns

	education, err := scanEducation(r.db.QueryRow(ctx, query,
		request.Institution,
		request.Level,
		request.FieldOfStudy,
		request.StartYear,
		request.EndYear,
		request.IsCurrent,
		request.GPA,
		request.SortOrder,
		id,
	))

	if err != nil {
		if err == pgx.ErrNoRows {
			return model.Education{}, pgx.ErrNoRows
		}

		return model.Education{}, fmt.Errorf("failed to update education: %w", err)
	}

	return education, nil
}

func (r *EducationRepository) Delete(ctx context.Context, id int16) error {
	result, err := r.db.Exec(ctx,
		`DELETE FROM educations WHERE id = $1`,
		id,
	)

	if err != nil {
		return fmt.Errorf("failed to delete education: %w", err)
	}

	if result.RowsAffected() == 0 {
		return pgx.ErrNoRows
	}

	return nil
}
