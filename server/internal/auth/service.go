package auth

import (
	"errors"

	"golang.org/x/crypto/bcrypt"
)

type Service struct {
	repo *Repository
}

func NewService(repo *Repository) *Service {
	return &Service{repo: repo}
}

func (s *Service) Register(name, email, password string) error {

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	if err != nil {
		return err
	}

	user := &User{
		Name:     name,
		Email:    email,
		Password: string(hashedPassword),
	}

	return s.repo.Create(user)
}

func (s *Service) Login(email, password string) (string, error) {

	user, err := s.repo.getByEmail(email)
	if err != nil {
		return "", errors.New("invalid credentials")
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))
	if err != nil {
		return "", errors.New("invalid credentials")
	}

	token, err := GenerateJWT(user.ID)
	if err != nil {
		return "", err
	}

	return token, nil
}