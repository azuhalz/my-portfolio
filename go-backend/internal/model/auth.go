package model

type LoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type LoginResponse struct {
	Admin Admin  `json:"admin"`
	Token string `json:"token"`
}
