# Alpine Dream Holidays

A full-stack travel agency platform built for **Alpine Dream Holidays**, a Kashmir-focused travel agency.

The platform provides a public travel website, travel offers, enquiry handling, an admin dashboard, authentication, and an AI-powered chat assistant.

---

## Project Overview

Alpine Dream Holidays is a production-oriented travel agency web application designed to:

- Showcase Kashmir travel experiences and destinations
- Display travel packages and featured offers
- Allow customers to submit enquiries
- Connect customers with the agency through WhatsApp
- Provide an admin dashboard for managing offers and enquiries
- Provide secure admin authentication
- Provide an AI-powered customer chat experience
- Run the complete application through Docker Compose

The application is structured as a separate frontend and backend with PostgreSQL as the database.

---

## Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Next.js Standalone production build

### Backend

- Java 21
- Spring Boot
- Spring Data JPA
- Hibernate
- Spring Security
- JWT authentication
- Flyway database migrations
- PostgreSQL

### AI

- Google Gemini API

### Infrastructure

- Docker
- Docker Compose
- PostgreSQL 17
- Maven
- Node.js 22

---

## Architecture

```text
                    ┌─────────────────────┐
                    │      Browser        │
                    │                     │
                    │   Next.js Frontend  │
                    └──────────┬──────────┘
                               │
                               │ HTTP
                               ▼
                    ┌─────────────────────┐
                    │   Spring Boot API   │
                    │                     │
                    │ Authentication      │
                    │ Offers              │
                    │ Enquiries           │
                    │ AI Chat             │
                    └──────────┬──────────┘
                               │
                               │ JPA / JDBC
                               ▼
                    ┌─────────────────────┐
                    │     PostgreSQL      │
                    │                     │
                    │ Offers              │
                    │ Enquiries           │
                    │ Admin Users         │
                    └─────────────────────┘

                         AI Chat
                            │
                            ▼
                    Google Gemini API
````

All services are connected through a Docker network when running with Docker Compose.

---

## Project Structure

```text
alpine-dream-holidays/
│
├── backend/
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       └── resources/
│   │           ├── db/
│   │           │   └── migration/
│   │           └── application.properties
│   │
│   ├── Dockerfile
│   ├── .dockerignore
│   └── pom.xml
│
├── travel-agency/
│   ├── src/
│   ├── public/
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── next.config.ts
│   ├── package.json
│   └── package-lock.json
│
├── docker-compose.yml
├── .env.example
├── .gitignore
└── README.md
```

---

# Environment Variables

The application requires environment variables for database access, authentication, AI access, and the frontend API URL.

Create a local `.env` file in the project root:

```bash
cp .env.example .env
```

Then configure:

```env
DB_NAME=
DB_USERNAME=
DB_PASSWORD=

JWT_SECRET=

GEMINI_API_KEY=

NEXT_PUBLIC_API_URL=
```

### Variable Descriptions

| Variable              | Purpose                                                  |
| --------------------- | -------------------------------------------------------- |
| `DB_NAME`             | PostgreSQL database name                                 |
| `DB_USERNAME`         | PostgreSQL username                                      |
| `DB_PASSWORD`         | PostgreSQL password                                      |
| `JWT_SECRET`          | Secret used to sign JWT authentication tokens            |
| `GEMINI_API_KEY`      | Google Gemini API key                                    |
| `NEXT_PUBLIC_API_URL` | Public URL used by the browser to access the backend API |

### Important

Never commit the real `.env` file.

The repository contains `.env.example` as a safe configuration template.

---

# Running with Docker

Docker Compose is the recommended way to run the complete application.

## Requirements

Install:

- Docker
- Docker Compose

Verify:

```bash
docker --version
docker compose version
```

---

## Local Docker Setup

Create the environment file:

```bash
cp .env.example .env
```

Fill in the required values.

For local development, the frontend API URL should normally be:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

Start the complete application:

```bash
docker compose up -d --build
```

Check the running services:

```bash
docker compose ps
```

The application consists of:

```text
Frontend     → http://localhost:3000
Backend      → http://localhost:8080
PostgreSQL   → Docker internal network
```

Open:

```text
http://localhost:3000
```

---

## Stopping the Application

Stop the containers:

```bash
docker compose down
```

Stop containers and remove the database volume:

```bash
docker compose down -v
```

> Removing the volume deletes the PostgreSQL data stored in that Docker volume.

---

## Useful Docker Commands

View all service logs:

```bash
docker compose logs
```

Follow backend logs:

```bash
docker compose logs -f backend
```

Follow frontend logs:

```bash
docker compose logs -f frontend
```

Follow PostgreSQL logs:

```bash
docker compose logs -f postgres
```

Rebuild the application:

```bash
docker compose build --no-cache
```

Restart the application:

```bash
docker compose restart
```

Check service status:

```bash
docker compose ps
```

---

# Backend

The backend is a Spring Boot application running on Java 21.

The backend provides APIs for:

- Authentication
- Offers
- Featured offers
- Enquiries
- AI chat
- Admin operations

The backend uses:

- Spring Security
- JWT
- JPA/Hibernate
- PostgreSQL
- Flyway

---

# Database Migrations

Database schema changes are managed using Flyway.

Migration files are located at:

```text
backend/src/main/resources/db/migration/
```

Current migrations include:

```text
V1__create_offer.sql
V2__seed_offers.sql
V3__create_enquiries_table.sql
V4__add_enquiry_status.sql
V5__add_featured_column.sql
V6__create_admin_users.sql
```

When the backend starts, Flyway applies pending migrations automatically.

Hibernate is configured to validate the schema rather than automatically modify it.

---

# Frontend

The frontend is a Next.js application.

The production Docker image uses the Next.js standalone build.

The frontend contains:

- Homepage
- Destinations
- About
- Contact
- Admin login
- Admin dashboard
- Offer management
- Enquiry management

---

# Admin Dashboard

The admin area is protected using JWT authentication.

Admin routes are available under:

```text
/admin
```

Login:

```text
/admin/login
```

Protected backend endpoints are under:

```text
/api/admin/**
```

The application does not expose admin credentials through the repository.

Admin credentials must be configured directly in the production database.

---

# Security

The application uses:

- JWT authentication
- BCrypt password hashing
- Environment-based secrets
- Spring Security
- Protected admin endpoints
- CORS configuration
- Docker isolation between services

### Never Commit

Do not commit:

```text
.env
.env.local
JWT secrets
Gemini API keys
Database passwords
Private keys
Personal access tokens
```

The repository's `.gitignore` is configured to exclude environment files and generated build artifacts.

---

# Production Deployment

The application is designed to run on a VPS or server using Docker Compose.

The general deployment architecture is:

```text
alpinedreamholidays.in
        │
        ▼
      VPS
        │
        ▼
   Docker Compose
        │
   ┌────┴─────┐
   │          │
Frontend    Backend
   │          │
   └────┬─────┘
        │
        ▼
   PostgreSQL
```

## Production Environment

On the production server:

1. Clone the private repository.
2. Create the `.env` file.
3. Configure production secrets.
4. Configure the production frontend API URL.
5. Build and start the Docker services.

Example:

```bash
git clone <PRIVATE_REPOSITORY_URL>

cd alpine-dream-holidays

cp .env.example .env

# Edit .env with production values

docker compose up -d --build
```

---

## Production Environment Variables

The production `.env` should contain real values:

```env
DB_NAME=your_database_name
DB_USERNAME=your_database_user
DB_PASSWORD=your_database_password

JWT_SECRET=your_long_random_jwt_secret

GEMINI_API_KEY=your_gemini_api_key

NEXT_PUBLIC_API_URL=your_public_backend_url
```

Do not commit this file.

---

## Important Production Note

`NEXT_PUBLIC_API_URL` is exposed to the browser by Next.js and therefore must point to a backend URL that is reachable by website visitors.

For local development:

```text
http://localhost:8080
```

For production, it must be replaced with the actual public backend/API URL configured by the hosting environment.

The Next.js server-side featured-offer request uses the Docker backend service directly:

```text
http://backend:8080
```

This works because the frontend and backend share the Docker network.

---

# Domain

Production domain:

```text
https://alpinedreamholidays.in
```

DNS and HTTPS configuration depend on the hosting environment.

The hosting provider/server administrator is responsible for configuring the domain, TLS certificate, and any required reverse proxy or port forwarding.

---

# Deployment Checklist

Before going live:

-  Configure production `.env`
-  Generate a strong `JWT_SECRET`
-  Configure production database credentials
-  Configure Gemini API key
-  Configure production `NEXT_PUBLIC_API_URL`
-  Configure DNS for `alpinedreamholidays.in`
-  Configure HTTPS
-  Configure backend CORS for the production frontend domain
-  Start Docker Compose
-  Verify frontend
-  Verify backend API
-  Verify admin login
-  Verify offers
-  Verify enquiries
-  Verify AI chat
-  Verify WhatsApp links
-  Verify database persistence
-  Verify production logs

---

# Development

## Frontend

To run the frontend outside Docker:

```bash
cd travel-agency
npm install
npm run dev
```

The development server normally runs on:

```text
http://localhost:3000
```

## Backend

To run the backend outside Docker:

```bash
cd backend
./mvnw spring-boot:run
```

or with Maven installed:

```bash
mvn spring-boot:run
```

The backend normally runs on:

```text
http://localhost:8080
```

A PostgreSQL instance must be available when running the backend outside Docker.

---

# Production Build

The Docker setup uses multi-stage builds.

### Backend

The backend is compiled with:

```text
Maven + Java 21
```

and the final runtime image uses:

```text
Eclipse Temurin 21 JRE
```

### Frontend

The frontend is built with:

```text
Node.js 22
```

and runs using the Next.js standalone production output.

This keeps the final runtime images smaller and avoids shipping unnecessary development dependencies.

---

# Repository

This repository is private and contains the source code required to build and deploy the Alpine Dream Holidays platform.

Secrets and environment-specific configuration are intentionally excluded from version control.

---

# License

Private project. All rights reserved.

```
