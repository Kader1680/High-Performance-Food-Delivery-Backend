package categories

import "context"

type Service struct {
	repo Repository
}

func NewService(repo Repository) *Service {
	return &Service{
		repo: repo,
	}
}

func (s *Service) Create(
	ctx context.Context,
	req CreateCategoryRequest,
) error {

	category := &Category{
		Title:        req.Title,
		Description:  req.Description,
		RestaurantID: req.RestaurantID,
	}

	return s.repo.Create(ctx, category)
}

func (s *Service) GetAll(ctx context.Context) ([]Category, error) {
	return s.repo.GetAll(ctx)
}