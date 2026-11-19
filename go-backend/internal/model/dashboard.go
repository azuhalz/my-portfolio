package model

import "time"

type DashboardStats struct {
	TotalProjects  int64      `json:"total_projects"`
	TotalViews     int64      `json:"total_views"`
	TotalMessages  int64      `json:"total_messages"`
	LastUpdated    *time.Time `json:"last_updated"`
	RecentMessages []Message  `json:"recent_messages"`
}
