package user

import (

	"github.com/jackc/pgx/v5/pgxpool"
)

type Repository struct {
	db *pgxpool.Pool
}

func NewRepository(db *pgxpool.Pool) *Repository {
	return &Repository{
		db: db,
	}
}

func (r *Repository) FindByID(id int64) (*User, error) {
	user := &User{
		ID:    id,
		Name:  "Abdelkader",
		Email: "test@gmail.com",
	}

	return user, nil
}

