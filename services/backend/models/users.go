package users

import (
	"log"

	database "github.com/unknown-prince/user-dashboard/database/connections"
)

type User struct {
	ID         int    `json:"id"`
	Name       string `json:"name"`
	Surname    string `json:"surname"`
	Number     int    `json:"number"`
	Gender     string `json:"gender"`
	Country    string `json:"country"`
	Dependents int    `json:"dependents"`
	Birthdate  string `json:"birthdate"`
}

func GetAll(gender *string, dateFrom *string, dateTo *string) []User {
	hasWhere := false
	query := "SELECT id, name, surname, number, gender, country, dependents, birthdate FROM users"
	if gender != nil {
		var genderValue string = *gender
		query += " WHERE gender = \"" + genderValue + "\""
		hasWhere = true
	}
	if dateFrom != nil && dateTo != nil {
		var dateFromValue string = *dateFrom
		var dateToValue string = *dateTo
		if hasWhere {
			query += " AND birthdate BETWEEN \"" + dateFromValue + "\" AND \"" + dateToValue + "\""
		} else {
			query += " WHERE birthdate BETWEEN \"" + dateFromValue + "\" AND \"" + dateToValue + "\""
		}
	} else if dateFrom != nil {
		var dateFromValue string = *dateFrom
		if hasWhere {
			query += " AND birthdate >= \"" + dateFromValue + "\""
		} else {
			query += " WHERE birthdate >= \"" + dateFromValue + "\""
		}
	} else if dateTo != nil {
		var dateToValue string = *dateTo
		if hasWhere {
			query += " AND birthdate <= \"" + dateToValue + "\""
		} else {
			query += " WHERE birthdate >= \"" + dateToValue + "\""
		}
	}

	stmt, err := database.Db.Prepare(query)
	if err != nil {
		log.Fatal(err)
	}
	defer stmt.Close()
	rows, err := stmt.Query()
	if err != nil {
		log.Fatal(err)

	}
	defer rows.Close()
	var users []User
	for rows.Next() {
		var user User
		err := rows.Scan(&user.ID, &user.Name, &user.Surname, &user.Number, &user.Gender, &user.Country, &user.Dependents, &user.Birthdate)
		if err != nil {
			log.Fatal(err)
		}
		users = append(users, user)
	}
	if err = rows.Err(); err != nil {
		log.Fatal(err)
	}
	return users
}
