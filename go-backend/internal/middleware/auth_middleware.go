package middleware

import (
	"context"
	"net/http"
	"os"

	"github.com/azuhalz/my-portfolio/go-backend/internal/service"
	"github.com/golang-jwt/jwt/v5"
)

type contextKey string

const AdminIDKey contextKey = "admin_id"

func AuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		secret := os.Getenv("JWT_SECRET")

		if len(secret) < 32 {
			http.Error(w, "Authentication is not configured", http.StatusInternalServerError)
			return
		}

		cookie, err := r.Cookie("auth_token")
		if err != nil {
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
			return
		}

		claims := &service.AuthClaims{}

		token, err := jwt.ParseWithClaims(
			cookie.Value,
			claims,
			func(token *jwt.Token) (interface{}, error) {
				return []byte(secret), nil
			},
			jwt.WithValidMethods([]string{"HS256"}),
			jwt.WithIssuer("my-portfolio"),
			jwt.WithExpirationRequired(),
		)

		if err != nil || !token.Valid || claims.AdminID <= 0 {
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
			return
		}

		ctx := context.WithValue(r.Context(), AdminIDKey, claims.AdminID)

		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

func GetAdminID(ctx context.Context) (int16, bool) {
	adminID, ok := ctx.Value(AdminIDKey).(int16)
	return adminID, ok
}
