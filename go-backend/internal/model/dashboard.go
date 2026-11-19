package model

type DashboardStats struct {
	TotalProjects       int `json:"total_projects"`
	TotalExperiences    int `json:"total_experiences"`
	TotalEducations     int `json:"total_educations"`
	TotalCertifications int `json:"total_certifications"`
	TotalMessages       int `json:"total_messages"`
	UnreadMessages      int `json:"unread_messages"`
	ArchivedMessages    int `json:"archived_messages"`
}
