package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.
// Code generated by github.com/99designs/gqlgen version v0.17.49

import (
	"context"

	"github.com/unknown-prince/user-dashboard/graph/model"
	users "github.com/unknown-prince/user-dashboard/models"
)

// Users is the resolver for the users field.
func (r *queryResolver) Users(ctx context.Context, gender *string, dateFrom *string, dateTo *string) ([]*model.User, error) {
	var resultUsers []*model.User
	var dbUsers = users.GetAll(gender, dateFrom, dateTo)
	for _, user := range dbUsers {
		resultUsers = append(resultUsers, &model.User{
			ID:         user.ID,
			Name:       user.Name,
			Surname:    user.Surname,
			Number:     user.Number,
			Gender:     user.Gender,
			Country:    user.Country,
			Dependents: user.Dependents,
			Birthdate:  user.Birthdate,
		})
	}
	return resultUsers, nil
}

// Query returns QueryResolver implementation.
func (r *Resolver) Query() QueryResolver { return &queryResolver{r} }

type queryResolver struct{ *Resolver }
