package auth

import (
	"time"
	"errors"

	"github.com/golang-jwt/jwt/v5"
)

var secretKey = []byte("secret-key-change-this")

func GenerateJWT(userID int64) (string, error) {

	claims := jwt.MapClaims{
		"user_id": userID,
		"exp":     time.Now().Add(time.Hour * 24).Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	return token.SignedString(secretKey)
}

func ValidateJWT(tokenString string) (int64, error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return secretKey, nil
	})

	if err != nil {
		return 0, err
	}

	if !token.Valid {
		return 0, errors.New("invalid token")
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		return 0, errors.New("invalid claims")
	}

	userIDFloat := claims["user_id"].(float64)
	userID := int64(userIDFloat)

	return userID, nil


}