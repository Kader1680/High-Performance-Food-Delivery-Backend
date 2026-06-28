package user

type Service struct {
	repo *Repository
}

func (s *Service) GetUser(id int64) (*User, error) {
	return s.repo.FindByID(id)
}