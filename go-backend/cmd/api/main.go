package main

import (
	"log"
	"net/http"

	"github.com/azuhalz/my-portfolio/go-backend/internal/handler"
	"github.com/azuhalz/my-portfolio/go-backend/internal/repository"
	"github.com/azuhalz/my-portfolio/go-backend/internal/service"
)

func main() {
	// Initialize repository
	projectRepository := repository.NewProjectRepository()

	// Initialize service
	projectService := service.NewProjectService(projectRepository)

	// Initialize handler
	projectHandler := handler.NewProjectHandler(projectService)

	// Register routes
	mux := http.NewServeMux()

	mux.HandleFunc("GET /api/health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte(`{"message":"Go backend is running!"}`))
	})

	mux.HandleFunc("GET /api/projects", projectHandler.GetAll)
	mux.HandleFunc("GET /api/projects/{slug}", projectHandler.GetBySlug)

	log.Println("Server running at http://localhost:8080")

	if err := http.ListenAndServe(":8080", mux); err != nil {
		log.Fatal(err)
	}
}
