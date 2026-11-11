package repository

import "github.com/azuhalz/my-portfolio/go-backend/internal/model"

type ProjectRepository struct {
	projects []model.Project
}

func NewProjectRepository() *ProjectRepository {
	return &ProjectRepository{
		projects: []model.Project{
			{
				ID:          1,
				Slug:        "my-first-project",
				Title:       "My First Project",
				Type:        "Personal Project",
				Role:        "Fullstack Developer",
				Timeline:    "2026",
				Overview:    "A sample project for learning Go backend.",
				TechStack:   []string{"Next.js", "Go", "PostgreSQL"},
				LiveDemoURL: "https://example.com",
				GitHubURL:   "https://github.com/example",
			},
			{
				ID:          2,
				Slug:        "my-second-project",
				Title:       "My Second Project",
				Type:        "Web Application",
				Role:        "Frontend Developer",
				Timeline:    "2025",
				Overview:    "Another sample project.",
				TechStack:   []string{"React", "TypeScript"},
				LiveDemoURL: "https://example.com",
				GitHubURL:   "https://github.com/example",
			},
		},
	}
}

func (r *ProjectRepository) GetAll() []model.Project {
	return r.projects
}

func (r *ProjectRepository) GetBySlug(slug string) (model.Project, bool) {
	for _, project := range r.projects {
		if project.Slug == slug {
			return project, true
		}
	}

	return model.Project{}, false
}
