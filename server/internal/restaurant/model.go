package restaurant

import "time"

type RestaurantStatus string

const (
	StatusActive    RestaurantStatus = "active"
	StatusInactive  RestaurantStatus = "inactive"
	StatusSuspended RestaurantStatus = "suspended"
	StatusClosed    RestaurantStatus = "closed"
)
type Restaurant struct {
	ID          int64
	OwnerID     int64
	Name        string
	Description string
	Phone       string
	Address     string
	Status      RestaurantStatus
	IsOpen      bool
	CreatedAt   time.Time
	UpdatedAt   time.Time
}