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
	// Get database URL from environment variable.
	databaseURL := os.Getenv("DATABASE_URL")
	if databaseURL == "" {
		log.Fatal("DATABASE_URL environment variable is not set")
	}

	// Initialize PostgreSQL connection pool.
	dbPool, err := database.NewPostgresPool(databaseURL)
	if err != nil {
		log.Fatal(err)
	}
	defer dbPool.Close()

	log.Println("Successfully connected to PostgreSQL!")

	// Initialize repositories.
	projectRepository := repository.NewProjectRepository(dbPool)
	heroRepository := repository.NewHeroRepository(dbPool)

	// Initialize services.
	projectService := service.NewProjectService(projectRepository)
	heroService := service.NewHeroService(heroRepository)

	// Initialize handlers.
	projectHandler := handler.NewProjectHandler(projectService)
	heroHandler := handler.NewHeroHandler(heroService)

	// Register routes.
	mux := http.NewServeMux()

	mux.HandleFunc("GET /api/health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte(`{"message":"Go backend is running!"}`))
	})

	// Project API.
	mux.HandleFunc("GET /api/projects", projectHandler.GetAll)
	mux.HandleFunc("GET /api/projects/{slug}", projectHandler.GetBySlug)
	mux.HandleFunc("POST /api/projects", projectHandler.Create)
	mux.HandleFunc("PUT /api/projects/{slug}", projectHandler.Update)
	mux.HandleFunc("DELETE /api/projects/{slug}", projectHandler.Delete)

	// Hero API.
	mux.HandleFunc("GET /api/hero", heroHandler.Get)
	mux.HandleFunc("PUT /api/hero", heroHandler.Update)

	log.Println("Server running at http://localhost:8080")

	if err := http.ListenAndServe(":8080", mux); err != nil {
		log.Fatal(err)
	}
}
