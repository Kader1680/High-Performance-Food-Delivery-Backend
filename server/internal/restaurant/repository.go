package restaurant

import (
	"context"
	"github.com/jackc/pgx/v5/pgxpool"

)

type Repository interface {
	Create(ctx context.Context, restaurant *Restaurant) error
	GetAll(ctx context.Context) ([]Restaurant, error)
}	

type repository struct {
	db *pgxpool.Pool
}

func NewRepository(db *pgxpool.Pool) Repository {
	return &repository{
		db: db,
	}
}

func (r *repository) Create(ctx context.Context, restaurant *Restaurant) error {

	const query = `
	INSERT INTO restaurants
	(
		owner_id,
		name,
		description,
		status,
		is_open,
		phone,
		address
	)
	VALUES
	(
		$1,$2,$3,$4,$5,$6,$7
	)
	RETURNING id, created_at, updated_at
	`

	err := r.db.QueryRow(
	ctx,
	query,
	restaurant.OwnerID,
	restaurant.Name,
	restaurant.Description,
	restaurant.Status,
	restaurant.IsOpen,
	restaurant.Phone,
	restaurant.Address,
	).Scan(
		&restaurant.ID,
		&restaurant.CreatedAt,
		&restaurant.UpdatedAt,
	)

	if err != nil {
		return err
	}

	return nil
}


func (r *repository) GetAll(ctx context.Context) ([]Restaurant, error){
	const query = `
	SELECT
    id,
    owner_id,
    name,
    description,
    status,
    is_open,
    phone,
    address,
    created_at,
    updated_at
	FROM restaurants;
	`
	rows, err := r.db.Query(ctx, query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var restaurants []Restaurant

	 
	for rows.Next() {

		var restaurant Restaurant

		err := rows.Scan(
			&restaurant.ID,
			&restaurant.OwnerID,
			&restaurant.Name,
			&restaurant.Description,
			&restaurant.Status,
			&restaurant.IsOpen,
			&restaurant.Phone,
			&restaurant.Address,
			&restaurant.CreatedAt,
			&restaurant.UpdatedAt,
		)

		if err != nil {
			return nil, err
		}

		restaurants = append(restaurants, restaurant)
		}

		if err := rows.Err(); err != nil {
			return nil, err
		}

		return restaurants, nil
	
}
	 
 