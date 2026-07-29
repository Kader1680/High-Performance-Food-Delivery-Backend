package categories

import "github.com/gin-gonic/gin"

type Handler struct {
	service *Service
}

func NewHandler(service *Service) *Handler {
	return &Handler{
		service: service,
	}
}
func (h *Handler) Create(c *gin.Context) {

	var req CreateCategoryRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}


	err := h.service.Create(
		c.Request.Context(),
		req,
	)

	if err != nil {
		c.JSON(500, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(201, gin.H{
		"message": "Category created successfully",
	})
}


func (h *Handler) GetAll(c *gin.Context) {
	categories, err := h.service.GetAll(
		c.Request.Context(),
	)
	if err != nil {
	c.JSON(500, gin.H{
		"error": err.Error(),
	})
	return
	}

	c.JSON(
	200,
	categories,
)
}