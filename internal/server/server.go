package server

import (
	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/Kader1680/High-Performance-Food-Delivery-Backend/internal/auth"
	"github.com/Kader1680/High-Performance-Food-Delivery-Backend/internal/middleware"
)

func NewRouter(pool *pgxpool.Pool) *gin.Engine {
	r := gin.Default()

	r.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "server running",
		})
	})

	 

	// Authentication dependency injection

	authRepo := auth.NewRepository(pool)
	authService := auth.NewService(authRepo)
	authHandler := auth.NewHandler(authService)

	authRoutes := r.Group("/auth")
	{
		authRoutes.POST("/register", authHandler.Register)
		authRoutes.POST("/login", authHandler.Login)
	}

	protected := r.Group("/")
	protected.Use(middleware.AuthMiddleware())
	{
		protected.GET("/users/me", authHandler.GetMe)
	}
	return r
}