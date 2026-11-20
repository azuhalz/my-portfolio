package main

import (
	"log"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/azuhalz/my-portfolio/go-backend/internal/database"
	"github.com/azuhalz/my-portfolio/go-backend/internal/handler"
	"github.com/azuhalz/my-portfolio/go-backend/internal/middleware"
	"github.com/azuhalz/my-portfolio/go-backend/internal/repository"
	"github.com/azuhalz/my-portfolio/go-backend/internal/service"
	"github.com/joho/godotenv"
	"github.com/rs/cors"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Fatal("Error loading .env file")
	}

	databaseURL := os.Getenv("DATABASE_URL")
	if databaseURL == "" {
		log.Fatal("DATABASE_URL environment variable is required")
	}

	dbPool, err := database.NewPostgresPool(databaseURL)
	if err != nil {
		log.Fatal(err)
	}
	defer dbPool.Close()

	log.Println("Successfully connected to PostgreSQL!")

	// Repositories
	projectRepository := repository.NewProjectRepository(dbPool)
	projectImageRepository := repository.NewProjectImageRepository(dbPool)
	heroRepository := repository.NewHeroRepository(dbPool)
	aboutRepository := repository.NewAboutRepository(dbPool)
	contactRepository := repository.NewContactRepository(dbPool)
	experienceRepository := repository.NewExperienceRepository(dbPool)
	educationRepository := repository.NewEducationRepository(dbPool)
	certificationRepository := repository.NewCertificationRepository(dbPool)
	messageRepository := repository.NewMessageRepository(dbPool)
	adminRepository := repository.NewAdminRepository(dbPool)
	authRepository := repository.NewAuthRepository(dbPool)
	portfolioViewRepository := repository.NewPortfolioViewRepository(dbPool)
	dashboardRepository := repository.NewDashboardRepository(dbPool)

	// Services
	projectService := service.NewProjectService(projectRepository)
	projectImageService := service.NewProjectImageService(
		projectRepository,
		projectImageRepository,
	)
	heroService := service.NewHeroService(heroRepository)
	aboutService := service.NewAboutService(aboutRepository)
	contactService := service.NewContactService(contactRepository)
	experienceService := service.NewExperienceService(experienceRepository)
	educationService := service.NewEducationService(educationRepository)
	certificationService := service.NewCertificationService(certificationRepository)
	messageService := service.NewMessageService(messageRepository)
	adminService := service.NewAdminService(adminRepository)
	authService := service.NewAuthService(authRepository)
	portfolioViewService := service.NewPortfolioViewService(portfolioViewRepository)
	dashboardService := service.NewDashboardService(dashboardRepository)

	// Handlers
	projectHandler := handler.NewProjectHandler(projectService)
	projectImageHandler := handler.NewProjectImageHandler(projectImageService)
	heroHandler := handler.NewHeroHandler(heroService)
	aboutHandler := handler.NewAboutHandler(aboutService)
	contactHandler := handler.NewContactHandler(contactService)
	experienceHandler := handler.NewExperienceHandler(experienceService)
	educationHandler := handler.NewEducationHandler(educationService)
	certificationHandler := handler.NewCertificationHandler(certificationService)
	messageHandler := handler.NewMessageHandler(messageService)
	adminHandler := handler.NewAdminHandler(adminService)
	authHandler := handler.NewAuthHandler(authService)
	portfolioViewHandler := handler.NewPortfolioViewHandler(portfolioViewService)
	dashboardHandler := handler.NewDashboardHandler(dashboardService)

	// Routes
	mux := http.NewServeMux()

	// Authentication Middleware
	protect := func(h http.HandlerFunc) http.Handler {
		return middleware.AuthMiddleware(h)
	}

	// Health API (Public)
	mux.HandleFunc("GET /api/health", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("Go backend is running!"))
	})

	// Project API
	mux.HandleFunc("GET /api/projects", projectHandler.GetAll)
	mux.HandleFunc("GET /api/projects/{slug}", projectHandler.GetBySlug)
	mux.Handle("POST /api/projects", protect(projectHandler.Create))
	mux.Handle("PUT /api/projects/{slug}", protect(projectHandler.Update))
	mux.Handle("DELETE /api/projects/{slug}", protect(projectHandler.Delete))
	mux.Handle("PUT /api/projects/reorder", protect(projectHandler.Reorder))

	// Project Image API
	mux.Handle("POST /api/projects/{slug}/images", protect(projectImageHandler.Upload))
	mux.HandleFunc("GET /api/projects/{slug}/images/{id}", projectImageHandler.GetByID)
	mux.Handle("DELETE /api/projects/{slug}/images/{id}", protect(projectImageHandler.Delete))

	// Hero API
	mux.HandleFunc("GET /api/hero", heroHandler.Get)
	mux.Handle("PUT /api/hero", protect(heroHandler.Update))
	mux.Handle("POST /api/hero/image", protect(heroHandler.UploadImage))
	mux.HandleFunc("GET /api/hero/image", heroHandler.GetImage)
	mux.Handle("DELETE /api/hero/image", protect(heroHandler.DeleteImage))

	// About API
	mux.HandleFunc("GET /api/about", aboutHandler.Get)
	mux.Handle("PUT /api/about", protect(aboutHandler.Update))

	// Contact API
	mux.HandleFunc("GET /api/contact", contactHandler.GetContact)
	mux.Handle("PUT /api/contact", protect(contactHandler.UpdateContact))
	mux.Handle("POST /api/contact/cv", protect(contactHandler.UploadCV))
	mux.HandleFunc("GET /api/contact/cv", contactHandler.GetCV)

	// Experience API
	mux.HandleFunc("GET /api/experiences", experienceHandler.GetAll)
	mux.HandleFunc("GET /api/experiences/{id}", experienceHandler.GetByID)
	mux.Handle("POST /api/experiences", protect(experienceHandler.Create))
	mux.Handle("PUT /api/experiences/reorder", protect(experienceHandler.Reorder))
	mux.Handle("PUT /api/experiences/{id}", protect(experienceHandler.Update))
	mux.Handle("DELETE /api/experiences/{id}", protect(experienceHandler.Delete))

	// Education API
	mux.HandleFunc("GET /api/educations", educationHandler.GetAll)
	mux.HandleFunc("GET /api/educations/{id}", educationHandler.GetByID)
	mux.Handle("POST /api/educations", protect(educationHandler.Create))
	mux.Handle("PUT /api/educations/{id}", protect(educationHandler.Update))
	mux.Handle("DELETE /api/educations/{id}", protect(educationHandler.Delete))

	// Certification API
	mux.HandleFunc("GET /api/certifications", certificationHandler.GetAll)
	mux.HandleFunc("GET /api/certifications/{id}", certificationHandler.GetByID)
	mux.Handle("POST /api/certifications", protect(certificationHandler.Create))
	mux.Handle("PUT /api/certifications/{id}", protect(certificationHandler.Update))
	mux.Handle("DELETE /api/certifications/{id}", protect(certificationHandler.Delete))

	// Message API
	mux.Handle("GET /api/messages", protect(messageHandler.GetAll))
	mux.Handle("GET /api/messages/{id}", protect(messageHandler.GetByID))
	mux.HandleFunc("POST /api/messages", messageHandler.Create)
	mux.Handle("PUT /api/messages/{id}/status", protect(messageHandler.UpdateStatus))
	mux.Handle("DELETE /api/messages/{id}", protect(messageHandler.Delete))

	// Admin API
	mux.Handle("GET /api/admin", protect(adminHandler.Get))
	mux.Handle("PUT /api/admin/profile", protect(adminHandler.UpdateProfile))
	mux.Handle("PUT /api/admin/password", protect(adminHandler.UpdatePassword))

	// Auth API
	mux.HandleFunc("POST /api/auth/login", authHandler.Login)
	mux.HandleFunc("POST /api/auth/logout", authHandler.Logout)
	mux.HandleFunc("GET /api/auth/csrf", handler.GetCSRFToken)

	// Portfolio View API (Public)
	mux.HandleFunc("POST /api/views", portfolioViewHandler.Create)

	// Dashboard API (Admin Only)
	mux.Handle("GET /api/dashboard", protect(dashboardHandler.GetStats))

	// CORS Configuration
	allowedOrigins := strings.Split(os.Getenv("ALLOWED_ORIGINS"), ",")

	for i := range allowedOrigins {
		allowedOrigins[i] = strings.TrimSpace(allowedOrigins[i])
	}

	corsHandler := cors.New(cors.Options{
		AllowedOrigins: allowedOrigins,
		AllowedMethods: []string{
			http.MethodGet,
			http.MethodPost,
			http.MethodPut,
			http.MethodDelete,
			http.MethodOptions,
		},
		AllowedHeaders: []string{
			"Content-Type",
			"Authorization",
			"X-CSRF-Token",
		},
		AllowCredentials: true,
	})

	csrfHandler := middleware.CSRFMiddleware(mux)
	corsHandlerWithCSRF := corsHandler.Handler(csrfHandler)

	server := &http.Server{
		Addr:              ":8080",
		Handler:           corsHandlerWithCSRF,
		ReadHeaderTimeout: 5 * time.Second,
		ReadTimeout:       10 * time.Second,
		WriteTimeout:      30 * time.Second,
		IdleTimeout:       60 * time.Second,
	}

	log.Println("Server running at http://localhost:8080")

	if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
		log.Fatal(err)
	}
}
