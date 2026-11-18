package repository

import (
	"context"

	"github.com/azuhalz/my-portfolio/go-backend/internal/model"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

type MessageRepository struct {
	db *pgxpool.Pool
}

func NewMessageRepository(db *pgxpool.Pool) *MessageRepository {
	return &MessageRepository{
		db: db,
	}
}

const messageColumns = `
	id,
	name,
	email,
	message,
	received_at,
	is_read,
	is_archived
`

func scanMessage(row pgx.Row) (model.Message, error) {
	var message model.Message

	err := row.Scan(
		&message.ID,
		&message.Name,
		&message.Email,
		&message.Message,
		&message.ReceivedAt,
		&message.IsRead,
		&message.IsArchived,
	)

	return message, err
}

func (r *MessageRepository) GetAll(ctx context.Context) ([]model.Message, error) {
	query := `
		SELECT ` + messageColumns + `
		FROM messages
		ORDER BY received_at DESC
	`

	rows, err := r.db.Query(ctx, query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	messages := make([]model.Message, 0)

	for rows.Next() {
		message, err := scanMessage(rows)
		if err != nil {
			return nil, err
		}

		messages = append(messages, message)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return messages, nil
}

func (r *MessageRepository) GetByID(ctx context.Context, id int16) (model.Message, error) {
	query := `
		SELECT ` + messageColumns + `
		FROM messages
		WHERE id = $1
	`

	return scanMessage(r.db.QueryRow(ctx, query, id))
}

func (r *MessageRepository) Create(ctx context.Context, request model.CreateMessageRequest) (model.Message, error) {
	query := `
		INSERT INTO messages (
			name,
			email,
			message
		)
		VALUES ($1, $2, $3)
		RETURNING ` + messageColumns

	return scanMessage(r.db.QueryRow(
		ctx,
		query,
		request.Name,
		request.Email,
		request.Message,
	))
}

func (r *MessageRepository) UpdateStatus(ctx context.Context, id int16, request model.UpdateMessageStatusRequest) (model.Message, error) {
	query := `
		UPDATE messages
		SET
			is_read = COALESCE($1, is_read),
			is_archived = COALESCE($2, is_archived)
		WHERE id = $3
		RETURNING ` + messageColumns

	return scanMessage(r.db.QueryRow(
		ctx,
		query,
		request.IsRead,
		request.IsArchived,
		id,
	))
}

func (r *MessageRepository) Delete(ctx context.Context, id int16) error {
	query := `
		DELETE FROM messages
		WHERE id = $1
	`

	commandTag, err := r.db.Exec(ctx, query, id)
	if err != nil {
		return err
	}

	if commandTag.RowsAffected() == 0 {
		return pgx.ErrNoRows
	}

	return nil
}
