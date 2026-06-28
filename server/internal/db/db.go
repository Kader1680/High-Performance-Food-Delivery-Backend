package db

import (
	"context"
	"log"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
)

func NewPostgresDB(url string) *pgxpool.Pool {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	pool, err := pgxpool.New(ctx, url)
	if err != nil {
		log.Fatal("cannot connect to database:", err)
	}
 
	err = pool.Ping(ctx)
	if err != nil {
		log.Fatal("database unreachable:", err)
	}

	log.Println("✅ Connected to PostgreSQL")

	return pool
}