package categories
import "time"
type Category struct{
	ID          	int64
	RestaurantID 	int64
	Title     		string
	Description 	string
	CreatedAt   	time.Time
	UpdatedAt   	time.Time 
}