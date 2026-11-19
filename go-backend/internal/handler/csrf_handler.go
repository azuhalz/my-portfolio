package handler

import (
	"encoding/json"
	"net/http"

	"github.com/gorilla/csrf"
)

func GetCSRFToken(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	response := map[string]string{
		"csrf_token": csrf.Token(r),
	}

	json.NewEncoder(w).Encode(response)
}
