# Alpine Dream Holidays - Deployment Guide

This document provides a comprehensive guide for deploying and maintaining the **Alpine Dream Holidays** full-stack travel platform across production and local environments.

---

## 🏗️ Production Architecture

```text
┌──────────────────────────────────────────────┐
│           Next.js Frontend (Vercel)          │
│        https://alpinedreamholidays.in        │
│      (or https://alpine-holidays.vercel.app) │
└──────────────────────┬───────────────────────┘
                       │
                       │ HTTPS / REST API
                       ▼
┌──────────────────────────────────────────────┐
│        Spring Boot Backend (Render.com)      │
│      https://alpine-holidays.onrender.com    │
│            (Dockerized Container)            │
└──────────────────────┬───────────────────────┘
                       │
                       │ JDBC / SSL (Port 5432)
                       ▼
┌──────────────────────────────────────────────┐
│        PostgreSQL Database (Neon.tech)       │
│             (Serverless Postgres)            │
└──────────────────────────────────────────────┘
```

---

## 1. 🗄️ Database Setup (Neon.tech)

The application uses PostgreSQL 17 managed with Flyway migrations.

### Creating the Database:
1. Log in to **[Neon.tech](https://neon.tech)** and create a new project (e.g. `alpine-db`).
2. Copy your connection details from the **Connection Details** card on the dashboard.

### Important: Unpooled vs Pooled Connection
* For **Spring Boot** and **Flyway**, use the **direct (unpooled)** connection string:
  * Remove `-pooler` from the Neon host domain.
  * *Example direct host format:* `ep-xxxx-xxxx.region.aws.neon.tech`
  * *Do not use:* `ep-xxxx-xxxx-pooler.region.aws.neon.tech`

### Restoring Database Dumps:
To import an existing database dump (e.g., `alpine_dream.sql`) into Neon, run:
```bash
Get-Content "path/to/alpine_dream.sql" | psql "postgresql://<DB_USERNAME>:<DB_PASSWORD>@<NEON_DIRECT_HOST>/neondb?sslmode=require"
```

---

## 2. ⚡ Backend Deployment (Render.com)

The backend is built as a Java 21 / Spring Boot multi-stage Docker container.

### Deploying on Render:
1. Log in to **[Render.com](https://render.com)**.
2. Click **New +** ➔ **Web Service**.
3. Connect your GitHub repository.
4. Set the following build settings:
   * **Root Directory**: `backend`
   * **Runtime**: `Docker`
   * **Instance Type**: `Free`

### Environment Variables:

| Variable | Description | Example / Format |
| :--- | :--- | :--- |
| `DB_URL` | Direct JDBC connection to Neon Postgres | `jdbc:postgresql://<NEON_DIRECT_HOST>/neondb?sslmode=require` |
| `DB_USERNAME` | Neon database username | `<your-db-username>` |
| `DB_PASSWORD` | Neon database password | `<your-db-password>` |
| `PORT` | Web port Render checks for traffic | `8080` |
| `JWT_SECRET` | Secret key used to sign admin JWTs | *(Must be at least 256-bit / 32 characters long)* |
| `GEMINI_API_KEY` | Google Gemini API Key for chatbot | *(Your Google AI Studio API key or `#` placeholder)* |

> ⚠️ **Important Security Rule**: JJWT requires `JWT_SECRET` to be at least 256 bits (32+ characters). A shorter key will cause `WeakKeyException` during startup.

---

## 3. 🌐 Frontend Deployment (Vercel)

The frontend is a Next.js 16 (React 19) App Router application.

### Deploying on Vercel:
1. Log in to **[Vercel](https://vercel.com)** and import your GitHub repository.
2. Under **Build and Development Settings**:
   * Set **Root Directory** to: `travel-agency`
   * Leave Framework Preset as: `Next.js`
3. Under **Environment Variables**:
   * **Key**: `NEXT_PUBLIC_API_URL`
   * **Value**: `https://<YOUR_RENDER_BACKEND_URL>`
   * **Type**: Select **`Config`** *(Do not select `Secret`, as `NEXT_PUBLIC_` variables must be accessible to browser JavaScript)*.
4. Click **Deploy**.

### Custom Domain Configuration (e.g. GoDaddy):
Add the following DNS records at your domain registrar:

| Record Type | Host / Name | Value / Points to |
| :--- | :--- | :--- |
| **A Record** | `@` | `76.76.21.21` |
| **CNAME** | `www` | `cname.vercel-dns.com` |

---

## 4. 🔒 CORS & Security Configuration

The backend is configured in `SecurityConfig.java` and `CorsConfig.java` with `allowedOriginPatterns("*")` to allow cross-origin requests from:
* Local development: `http://localhost:3000`
* Vercel production domains: `https://*.vercel.app`
* Custom domain: `https://*.alpinedreamholidays.in`

---

## 5. 💻 Local Development Setup

To run the application locally on your machine:

### 1. Start Database & Backend (Docker):
From the project root:
```bash
docker compose up -d backend postgres
```
Verify backend is live:
* Swagger UI: `http://localhost:8080/swagger-ui.html`
* Public Offers API: `http://localhost:8080/api/offers`

### 2. Start Frontend:
```bash
cd travel-agency
npm install
npm run dev
```
Open in browser:
* Website: `http://localhost:3000`
* Admin Console: `http://localhost:3000/admin/login`

---

## 6. 🛠️ Useful Operations & Maintenance

* **Check running local containers**:
  ```bash
  docker ps
  ```
* **View backend logs**:
  ```bash
  docker logs -f alpine-dream-backend
  ```
* **Stop local containers**:
  ```bash
  docker compose down
  ```
