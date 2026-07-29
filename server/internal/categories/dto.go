package categories

type CreateCategoryRequest struct{
	Title   		string `json:"title" binding:"required"`
	Description     string `json:"description"`
	RestaurantID 	int64  `json:"restaurant_id" binding:"required"`
}


type CategoryResponse struct{
	ID          	int64  `json:"id"`
	Title   		string `json:"title"`
	Description     string `json:"description"`
	RestaurantID    int64  `json:"restaurant_id"`
}