package main

import (
	"log"
	"net/http"
	"os"

	"github.com/azuhalz/my-portfolio/go-backend/internal/database"
	"github.com/azuhalz/my-portfolio/go-backend/internal/handler"
	"github.com/azuhalz/my-portfolio/go-backend/internal/repository"
	"github.com/azuhalz/my-portfolio/go-backend/internal/service"
)

func main() {
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
	heroRepository := repository.NewHeroRepository(dbPool)
	aboutRepository := repository.NewAboutRepository(dbPool)
	contactRepository := repository.NewContactRepository(dbPool)
	experienceRepository := repository.NewExperienceRepository(dbPool)
	educationRepository := repository.NewEducationRepository(dbPool)
	certificationRepository := repository.NewCertificationRepository(dbPool)
	messageRepository := repository.NewMessageRepository(dbPool)
	adminRepository := repository.NewAdminRepository(dbPool)

	// Services
	projectService := service.NewProjectService(projectRepository)
	heroService := service.NewHeroService(heroRepository)
	aboutService := service.NewAboutService(aboutRepository)
	contactService := service.NewContactService(contactRepository)
	experienceService := service.NewExperienceService(experienceRepository)
	educationService := service.NewEducationService(educationRepository)
	certificationService := service.NewCertificationService(certificationRepository)
	messageService := service.NewMessageService(messageRepository)
	adminService := service.NewAdminService(adminRepository)

	// Handlers
	projectHandler := handler.NewProjectHandler(projectService)
	heroHandler := handler.NewHeroHandler(heroService)
	aboutHandler := handler.NewAboutHandler(aboutService)
	contactHandler := handler.NewContactHandler(contactService)
	experienceHandler := handler.NewExperienceHandler(experienceService)
	educationHandler := handler.NewEducationHandler(educationService)
	certificationHandler := handler.NewCertificationHandler(certificationService)
	messageHandler := handler.NewMessageHandler(messageService)
	adminHandler := handler.NewAdminHandler(adminService)

	// Routes
	mux := http.NewServeMux()

	mux.HandleFunc("GET /api/health", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("Go backend is running!"))
	})

	// Project API
	mux.HandleFunc("GET /api/projects", projectHandler.GetAll)
	mux.HandleFunc("GET /api/projects/{slug}", projectHandler.GetBySlug)
	mux.HandleFunc("POST /api/projects", projectHandler.Create)
	mux.HandleFunc("PUT /api/projects/{slug}", projectHandler.Update)
	mux.HandleFunc("DELETE /api/projects/{slug}", projectHandler.Delete)

	// Hero API
	mux.HandleFunc("GET /api/hero", heroHandler.Get)
	mux.HandleFunc("PUT /api/hero", heroHandler.Update)

	// About API
	mux.HandleFunc("GET /api/about", aboutHandler.Get)
	mux.HandleFunc("PUT /api/about", aboutHandler.Update)

	// Contact API
	mux.HandleFunc("GET /api/contact", contactHandler.GetContact)
	mux.HandleFunc("PUT /api/contact", contactHandler.UpdateContact)
	mux.HandleFunc("POST /api/contact/cv", contactHandler.UploadCV)
	mux.HandleFunc("GET /api/contact/cv", contactHandler.GetCV)

	// Experience API
	mux.HandleFunc("GET /api/experiences", experienceHandler.GetAll)
	mux.HandleFunc("GET /api/experiences/{id}", experienceHandler.GetByID)
	mux.HandleFunc("POST /api/experiences", experienceHandler.Create)
	mux.HandleFunc("PUT /api/experiences/{id}", experienceHandler.Update)
	mux.HandleFunc("DELETE /api/experiences/{id}", experienceHandler.Delete)

	// Education API
	mux.HandleFunc("GET /api/educations", educationHandler.GetAll)
	mux.HandleFunc("GET /api/educations/{id}", educationHandler.GetByID)
	mux.HandleFunc("POST /api/educations", educationHandler.Create)
	mux.HandleFunc("PUT /api/educations/{id}", educationHandler.Update)
	mux.HandleFunc("DELETE /api/educations/{id}", educationHandler.Delete)

	// Certification API
	mux.HandleFunc("GET /api/certifications", certificationHandler.GetAll)
	mux.HandleFunc("GET /api/certifications/{id}", certificationHandler.GetByID)
	mux.HandleFunc("POST /api/certifications", certificationHandler.Create)
	mux.HandleFunc("PUT /api/certifications/{id}", certificationHandler.Update)
	mux.HandleFunc("DELETE /api/certifications/{id}", certificationHandler.Delete)

	// Message API
	mux.HandleFunc("GET /api/messages", messageHandler.GetAll)
	mux.HandleFunc("GET /api/messages/{id}", messageHandler.GetByID)
	mux.HandleFunc("POST /api/messages", messageHandler.Create)
	mux.HandleFunc("PUT /api/messages/{id}/status", messageHandler.UpdateStatus)
	mux.HandleFunc("DELETE /api/messages/{id}", messageHandler.Delete)

	// Admin API
	mux.HandleFunc("GET /api/admin", adminHandler.Get)
	mux.HandleFunc("PUT /api/admin/profile", adminHandler.UpdateProfile)
	mux.HandleFunc("PUT /api/admin/password", adminHandler.UpdatePassword)

	log.Println("Server running at http://localhost:8080")

	if err := http.ListenAndServe(":8080", mux); err != nil {
		log.Fatal(err)
	}
}
