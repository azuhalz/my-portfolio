package handler

import (
	"encoding/json"
	"net/http"
	"os"
	"strings"

	"github.com/azuhalz/my-portfolio/go-backend/internal/model"
	"github.com/azuhalz/my-portfolio/go-backend/internal/service"
)

type AuthHandler struct {
	service *service.AuthService
}

func NewAuthHandler(service *service.AuthService) *AuthHandler {
	return &AuthHandler{service: service}
}

func (h *AuthHandler) Login(w http.ResponseWriter, r *http.Request) {
	var req model.LoginRequest

	if err := decodeJSON(r, &req); err != nil {
		writeJSONError(w, http.StatusBadRequest, "Invalid request body")
		return
	}

	admin, token, err := h.service.Login(r.Context(), req)
	if err != nil {
		if strings.Contains(err.Error(), "JWT_SECRET") {
			writeJSONError(w, http.StatusInternalServerError, "Authentication is not configured")
			return
		}

		if strings.Contains(err.Error(), "invalid email or password") {
			writeJSONError(w, http.StatusUnauthorized, "Invalid email or password")
			return
		}

		if strings.Contains(err.Error(), "required") {
			writeJSONError(w, http.StatusBadRequest, err.Error())
			return
		}

		writeJSONError(w, http.StatusInternalServerError, "Failed to login")
		return
	}

	isProduction := os.Getenv("APP_ENV") == "production"

	http.SetCookie(w, &http.Cookie{
		Name:     "auth_token",
		Value:    token,
		Path:     "/",
		HttpOnly: true,
		Secure:   isProduction,
		SameSite: http.SameSiteLaxMode,
		MaxAge:   24 * 60 * 60,
	})

	w.Header().Set("Content-Type", "application/json")

	json.NewEncoder(w).Encode(map[string]interface{}{
		"message": "Login successful",
		"admin":   admin,
	})
}

func (h *AuthHandler) Logout(w http.ResponseWriter, r *http.Request) {
	isProduction := os.Getenv("APP_ENV") == "production"

	http.SetCookie(w, &http.Cookie{
		Name:     "auth_token",
		Value:    "",
		Path:     "/",
		HttpOnly: true,
		Secure:   isProduction,
		SameSite: http.SameSiteLaxMode,
		MaxAge:   -1,
	})

	w.Header().Set("Content-Type", "application/json")

	json.NewEncoder(w).Encode(map[string]string{
		"message": "Logout successful",
	})
}
