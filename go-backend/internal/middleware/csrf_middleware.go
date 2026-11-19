package middleware

import (
	"net/http"
	"os"

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

	return csrf.Protect(
		[]byte(secret),
		csrf.Secure(os.Getenv("APP_ENV") == "production"),
		csrf.Path("/"),
		csrf.HttpOnly(true),
		csrf.SameSite(csrf.SameSiteLaxMode),
		csrf.TrustedOrigins([]string{
			"localhost:3000",
		}),
	)(next)
}
