package auth 

import (
	"context"
	"github.com/jackc/pgx/v5/pgxpool"
)
type Repository struct {
	db *pgxpool.Pool
}
func NewRepository(db *pgxpool.Pool) *Repository {
	return &Repository{db: db}
}

// create new user register
func (r *Repository) Create(user *User) error  {

	query := 
	`
		INSERT INTO users (name, email, password)
		VALUES ($1, $2, $3)
		RETURNING id
	`
	return r.db.QueryRow(
			context.Background(),
			query,
			user.Name,
			user.Email,
			user.Password,
		).Scan(&user.ID)
}

// Get by Email 

func (r *Repository) getByEmail(email string) (*User, error){

	query := `
		SELECT id, name, email, password
		FROM users
		WHERE email = $1
	`

	var user User

	err := r.db.QueryRow(context.Background(), query, email).
		Scan(&user.ID, &user.Name, &user.Email, &user.Password)

	if err != nil {
		return nil, err
	}

	return &user, nil
}