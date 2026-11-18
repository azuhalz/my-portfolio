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

	// Services
	projectService := service.NewProjectService(projectRepository)
	heroService := service.NewHeroService(heroRepository)
	aboutService := service.NewAboutService(aboutRepository)
	contactService := service.NewContactService(contactRepository)

	// Handlers
	projectHandler := handler.NewProjectHandler(projectService)
	heroHandler := handler.NewHeroHandler(heroService)
	aboutHandler := handler.NewAboutHandler(aboutService)
	contactHandler := handler.NewContactHandler(contactService)

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

	log.Println("Server running at http://localhost:8080")

	if err := http.ListenAndServe(":8080", mux); err != nil {
		log.Fatal(err)
	}
}
