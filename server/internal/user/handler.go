package user

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)
type Handler struct {
	service *Service
}
func (h *Handler) GetUser(c *gin.Context) {
	idParam := c.Param("id")

	id, err := strconv.ParseInt(idParam, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "invalid user id",
		})
		return
	}

	user, err := h.service.GetUser(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "failed to fetch user",
		})
		return
	}

	c.JSON(http.StatusOK, user)
}