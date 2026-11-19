package model

import "time"

type PortfolioView struct {
	ID       int64     `json:"id"`
	ViewedAt time.Time `json:"viewed_at"`
}
