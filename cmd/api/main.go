package main

import (
	"log"
	"github.com/Kader1680/High-Performance-Food-Delivery-Backend/internal/db"
	"github.com/Kader1680/High-Performance-Food-Delivery-Backend/internal/server"
)

func main() {
	databaseURL := "postgres://abdel:1234@localhost:5432/food_delivery?sslmode=disable"

	pool := db.NewPostgresDB(databaseURL)

	// 2. start server
	router := server.NewRouter(pool)

	log.Fatal(router.Run(":8080"))

	 
}