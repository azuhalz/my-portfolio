package model

import "time"

type Certification struct {
	ID            int16      `json:"id"`
	Name          string     `json:"name"`
	Issuer        string     `json:"issuer"`
	IssuedDate    time.Time  `json:"issued_date"`
	ExpiryDate    *time.Time `json:"expiry_date"`
	CredentialURL string     `json:"credential_url"`
	SortOrder     int        `json:"sort_order"`
	CreatedAt     time.Time  `json:"created_at"`
	UpdatedAt     time.Time  `json:"updated_at"`
}

type CreateCertificationRequest struct {
	Name          string     `json:"name"`
	Issuer        string     `json:"issuer"`
	IssuedDate    time.Time  `json:"issued_date"`
	ExpiryDate    *time.Time `json:"expiry_date"`
	CredentialURL string     `json:"credential_url"`
	SortOrder     int        `json:"sort_order"`
}

type UpdateCertificationRequest struct {
	Name          string     `json:"name"`
	Issuer        string     `json:"issuer"`
	IssuedDate    time.Time  `json:"issued_date"`
	ExpiryDate    *time.Time `json:"expiry_date"`
	CredentialURL string     `json:"credential_url"`
	SortOrder     int        `json:"sort_order"`
}
