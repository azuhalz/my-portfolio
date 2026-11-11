package model

type Project struct {
	ID          int      `json:"id"`
	Slug        string   `json:"slug"`
	Title       string   `json:"title"`
	Type        string   `json:"type"`
	Role        string   `json:"role"`
	Timeline    string   `json:"timeline"`
	Overview    string   `json:"overview"`
	TechStack   []string `json:"tech_stack"`
	LiveDemoURL string   `json:"live_demo_url"`
	GitHubURL   string   `json:"github_url"`
}
