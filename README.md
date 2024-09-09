## Quickstart

Make sure you have the following installed:
- GO
- Node.JS / NPM
- MySQL Server & Client

Ensure you have an `.env` setup (in the `/servers/backend` directory) with the following:
```
PORT=8080
CONNECTION=root@tcp(localhost)
DATABASE=dashboard
```

Ensure that your MySQL credentials are correct in your `.env` and run the following to perform migrations: `migrate -path /servers/backend/database/migrations/mysql up`

From within the `/services/backend` directory, bring up the backend API/service by running: `go run server.go` (not recommended in production, use `go build server.go`).
- Browse to http://localhost:8080

From within the `/services/frontend` directory, bring up the frontend by running: `npm run dev` (not recommended in production).
- Browse to http://localhost:3000

## Overview

This project is a very simple web app for displaying a list of users and their data. There are 2 pages

- http://localhost:8080/users \
Shows a list of all the users in the system

- http://localhost:8080/overview \
Shows the user data in various forms and allows for filtering and searching.

## Basic Architecture

This app consists of 2 separate codebases contained in 1 repo. The `/frontend` codebase handles the web frontend and the
`/backend` codebase handles data and acts as the API. Each codebase is entirely self contained and does not share
code with the other. They can only communicate over http.

The entry point into the backend is `/services/backend/server.go`. All this file does is require the necessary packages, setup the GO server, and a middleware to disable CORS (not for production use).
The entry point into the frontend is `/services/frontend/app/page.js`. All this file does is load the initial page of the NextJS framework.

The `routes.php` file boots up Slim Framework v3 and defines the routes for each codebase.
