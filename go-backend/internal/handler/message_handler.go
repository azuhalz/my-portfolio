package handler

import (
	"encoding/json"
	"errors"
	"net/http"
	"strconv"

	"github.com/azuhalz/my-portfolio/go-backend/internal/model"
	"github.com/azuhalz/my-portfolio/go-backend/internal/service"
	"github.com/jackc/pgx/v5"
)

type MessageHandler struct {
	service *service.MessageService
}

func NewMessageHandler(service *service.MessageService) *MessageHandler {
	return &MessageHandler{
		service: service,
	}
}

func (h *MessageHandler) GetAll(w http.ResponseWriter, r *http.Request) {
	messages, err := h.service.GetAll(r.Context())
	if err != nil {
		writeJSONError(w, http.StatusInternalServerError, "failed to get messages")
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(messages)
}

func (h *MessageHandler) GetByID(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.ParseInt(r.PathValue("id"), 10, 16)
	if err != nil {
		writeJSONError(w, http.StatusBadRequest, "invalid message ID")
		return
	}

	message, err := h.service.GetByID(r.Context(), int16(id))
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			writeJSONError(w, http.StatusNotFound, "message not found")
			return
		}

		if errors.Is(err, service.ErrInvalidMessage) {
			writeJSONError(w, http.StatusBadRequest, err.Error())
			return
		}

		writeJSONError(w, http.StatusInternalServerError, "failed to get message")
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(message)
}

func (h *MessageHandler) Create(w http.ResponseWriter, r *http.Request) {
	var request model.CreateMessageRequest

	if err := decodeJSON(r, &request); err != nil {
		writeJSONError(w, http.StatusBadRequest, "invalid request body")
		return
	}

	message, err := h.service.Create(r.Context(), request)
	if err != nil {
		if errors.Is(err, service.ErrInvalidMessage) {
			writeJSONError(w, http.StatusBadRequest, err.Error())
			return
		}

		writeJSONError(w, http.StatusInternalServerError, "failed to create message")
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(message)
}

func (h *MessageHandler) UpdateStatus(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.ParseInt(r.PathValue("id"), 10, 16)
	if err != nil {
		writeJSONError(w, http.StatusBadRequest, "invalid message ID")
		return
	}

	var request model.UpdateMessageStatusRequest

	if err := decodeJSON(r, &request); err != nil {
		writeJSONError(w, http.StatusBadRequest, "invalid request body")
		return
	}

	message, err := h.service.UpdateStatus(r.Context(), int16(id), request)
	if err != nil {
		if errors.Is(err, service.ErrInvalidMessage) {
			writeJSONError(w, http.StatusBadRequest, err.Error())
			return
		}

		if errors.Is(err, pgx.ErrNoRows) {
			writeJSONError(w, http.StatusNotFound, "message not found")
			return
		}

		writeJSONError(w, http.StatusInternalServerError, "failed to update message")
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(message)
}

func (h *MessageHandler) Delete(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.ParseInt(r.PathValue("id"), 10, 16)
	if err != nil {
		writeJSONError(w, http.StatusBadRequest, "invalid message ID")
		return
	}

	err = h.service.Delete(r.Context(), int16(id))
	if err != nil {
		if errors.Is(err, service.ErrInvalidMessage) {
			writeJSONError(w, http.StatusBadRequest, err.Error())
			return
		}

		if errors.Is(err, pgx.ErrNoRows) {
			writeJSONError(w, http.StatusNotFound, "message not found")
			return
		}

		writeJSONError(w, http.StatusInternalServerError, "failed to delete message")
		return
	}

	w.WriteHeader(http.StatusNoContent)
}
