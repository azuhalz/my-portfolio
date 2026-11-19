package service

import (
	"context"
	"errors"
	"os"
	"strings"
	"time"

	"github.com/azuhalz/my-portfolio/go-backend/internal/model"
	"github.com/azuhalz/my-portfolio/go-backend/internal/repository"
	"github.com/golang-jwt/jwt/v5"
	"github.com/jackc/pgx/v5"
	"golang.org/x/crypto/bcrypt"
)

type AuthService struct {
	repo *repository.AuthRepository
}

type AuthClaims struct {
	AdminID int16  `json:"admin_id"`
	Email   string `json:"email"`
	jwt.RegisteredClaims
}

func NewAuthService(repo *repository.AuthRepository) *AuthService {
	return &AuthService{repo: repo}
}

func (s *AuthService) Login(
	ctx context.Context,
	req model.LoginRequest,
) (*model.Admin, string, error) {
	req.Email = strings.TrimSpace(req.Email)

	if req.Email == "" || req.Password == "" {
		return nil, "", errors.New("email and password are required")
	}

	admin, passwordHash, err := s.repo.GetAdminByEmail(ctx, req.Email)
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return nil, "", errors.New("invalid email or password")
		}
		return nil, "", err
	}

	if err := bcrypt.CompareHashAndPassword(
		[]byte(passwordHash),
		[]byte(req.Password),
	); err != nil {
		return nil, "", errors.New("invalid email or password")
	}

	secret := os.Getenv("JWT_SECRET")
	if len(secret) < 32 {
		return nil, "", errors.New("JWT_SECRET must be at least 32 characters")
	}

	now := time.Now()

	claims := AuthClaims{
		AdminID: admin.ID,
		Email:   admin.Email,
		RegisteredClaims: jwt.RegisteredClaims{
			Issuer:    "my-portfolio",
			ExpiresAt: jwt.NewNumericDate(now.Add(24 * time.Hour)),
			IssuedAt:  jwt.NewNumericDate(now),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	tokenString, err := token.SignedString([]byte(secret))
	if err != nil {
		return nil, "", err
	}

	return admin, tokenString, nil
}
