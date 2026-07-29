package categories

import (
	"context"

	"github.com/jackc/pgx/v5/pgxpool"
)

type Repository interface {
	Create(ctx context.Context, category *Category) error
	GetAll(ctx context.Context) ([]Category, error)
}

type repository struct {
	db *pgxpool.Pool
}

func NewRepository(db *pgxpool.Pool) Repository {
	return &repository{
		db: db,
	}
}

func (r *repository) Create(ctx context.Context, category *Category) error {

	const query = `
	INSERT INTO categories
	(
		title,
		description,
		restaurant_id
	)
	VALUES
	(
		$1,$2,$3
	)
	RETURNING id, created_at, updated_at
	`

	err := r.db.QueryRow(
		ctx,
		query,
		category.Title,
		category.Description,
		category.RestaurantID,
	).Scan(
		&category.ID,
		&category.CreatedAt,
		&category.UpdatedAt,
	)

	return err
}


func (r *repository) GetAll(ctx context.Context) ([]Category, error) {

	const query = `
	SELECT
		id,
		restaurant_id,
		title,
		description,
		created_at,
		updated_at
	FROM categories;
	`

	rows, err := r.db.Query(ctx, query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var categories []Category

	for rows.Next() {

		var category Category

		err := rows.Scan(
			&category.ID,
			&category.RestaurantID,
			&category.Title,
			&category.Description,
			&category.CreatedAt,
			&category.UpdatedAt,
		)

		if err != nil {
			return nil, err
		}

		categories = append(categories, category)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return categories, nil
}