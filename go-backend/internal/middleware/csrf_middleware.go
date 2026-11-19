package middleware

import (
	"net/http"
	"os"
	"strings"

	"github.com/gorilla/csrf"
)

func CSRFMiddleware(next http.Handler) http.Handler {
	secret := os.Getenv("CSRF_SECRET")

	if len(secret) < 32 {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			http.Error(
				w,
				"CSRF protection is not configured",
				http.StatusInternalServerError,
			)
		})
	}

	allowedOrigins := strings.Split(os.Getenv("ALLOWED_ORIGINS"), ",")

	trustedOrigins := make([]string, 0, len(allowedOrigins))

	for _, origin := range allowedOrigins {
		origin = strings.TrimSpace(origin)

		if origin == "" {
			continue
		}

		origin = strings.TrimPrefix(origin, "https://")
		origin = strings.TrimPrefix(origin, "http://")

		trustedOrigins = append(trustedOrigins, origin)
	}

	return csrf.Protect(
		[]byte(secret),
		csrf.Secure(os.Getenv("APP_ENV") == "production"),
		csrf.Path("/"),
		csrf.HttpOnly(true),
		csrf.SameSite(csrf.SameSiteLaxMode),
		csrf.TrustedOrigins(trustedOrigins),
	)(next)
}
