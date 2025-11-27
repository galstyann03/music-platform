# Music Platform Backend API

A comprehensive music streaming platform backend system built with Node.js, TypeScript, Express, and PostgreSQL. This project implements a Spotify-like database system with full CRUD operations and complex query support.

## 👥 Team Members

- **Galstyan Narek**
- **Gasparyan Sofiya**
- **Martirosyan Gohar**

## 📋 Project Overview

This is a Database Systems course project that implements a complete music streaming platform backend. The system supports:

- User management with authentication
- Artist and album management
- Song cataloging with genres
- Playlist creation and management
- Listening history tracking
- Subscription management (Free, Premium, Family)
- Advertisement system
- Stakeholder management (singers, composers, producers, etc.)
- User interactions (likes, follows)

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js 5.x
- **Database**: PostgreSQL 16
- **ORM**: TypeORM
- **Validation**: class-validator, class-transformer
- **Documentation**: Swagger/OpenAPI
- **Logging**: Winston
- **Containerization**: Docker & Docker Compose

## 📁 Project Structure

```
music-platform/
├── src/
│   ├── configs/          # Configuration files (database, swagger, winston)
│   ├── containers/       # Dependency injection containers
│   ├── controllers/      # Request/response handlers
│   ├── dtos/            # Data Transfer Objects with validation
│   ├── entities/         # TypeORM entity definitions
│   ├── middlewares/      # Express middlewares
│   ├── migrations/       # Database migrations
│   ├── repositories/     # Database query layer
│   ├── routes/           # API route definitions
│   ├── services/         # Business logic layer
│   ├── swagger/          # Swagger YAML documentation
│   ├── utils/            # Utility functions
│   ├── app.ts            # Express app setup
│   └── server.ts         # Server entry point
├── scripts/
│   ├── ddl/              # DDL SQL scripts
│   ├── dml/              # DML SQL scripts (seed data)
│   └── dql/              # DQL SQL scripts (queries)
├── docker/               # Docker configuration
│   ├── docker-compose.yml
│   └── dockerfiles/
├── config.json           # Environment-specific configuration
├── package.json
└── tsconfig.json
```

## 🗄️ Database Schema

The database consists of 18 tables:

### Base Tables
- `users` - User accounts
- `artists` - Music artists
- `genres` - Music genres
- `stakeholders` - Song contributors (singers, composers, etc.)
- `advertisements` - Ad content

### Dependent Tables
- `albums` - Music albums
- `songs` - Individual songs
- `playlists` - User playlists
- `subscriptions` - User subscription plans
- `listening_histories` - User listening history

### Junction Tables
- `artist_songs` - Many-to-many: Artists ↔ Songs
- `followers` - Many-to-many: Users ↔ Artists
- `song_genres` - Many-to-many: Songs ↔ Genres
- `album_genres` - Many-to-many: Albums ↔ Genres
- `song_stakeholders` - Many-to-many: Songs ↔ Stakeholders
- `likes` - Many-to-many: Users ↔ Songs
- `playlist_songs` - Many-to-many: Playlists ↔ Songs
- `ad_shown_to_users` - Many-to-many: Advertisements ↔ Users

## 🚀 Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **PostgreSQL** 16 (if running locally)
- **Docker** and **Docker Compose** (for containerized setup)

## 📦 Installation

### Clone the repository

```bash
git clone <repository-url>
cd music-platform
```

### Install dependencies

```bash
npm install
```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Database credentials (required)
DB_USER=your_db_user
DB_PASSWORD=your_db_password

# Optional: Override defaults
PORT=3001
HOST=0.0.0.0
LOG_LEVEL=debug
ENV=local
```

### Config.json

The `config.json` file contains environment-specific settings:

- **local**: For local development (localhost:5433)
- **docker**: For Docker containerized setup (postgres:5432)
- **production**: For production deployment

## 🏃 Running the Application

### Option 1: Local Development (Recommended for Development)

#### 1. Start PostgreSQL Database (Docker)

```bash
cd docker
docker-compose up -d postgres
```

This starts PostgreSQL on port `5433` (mapped from container port 5432).

#### 2. Set Environment

The application defaults to `local` environment. You can explicitly set it:

```bash
# Windows PowerShell
$env:ENV="local"

# Linux/Mac
export ENV=local
```

#### 3. Run Database Migrations

```bash
npm run migration:run
```

#### 4. Start the Development Server

```bash
npm run dev
```

The API will be available at `http://localhost:3001`

### Option 2: Docker Compose (Recommended for Testing)

#### 1. Start All Services

```bash
cd docker
docker-compose up -d
```

This starts both PostgreSQL and the API server.

#### 2. Run Migrations (if needed)

```bash
npm run migration:run
```

The API will be available at `http://localhost:3001`

### Option 3: Production Build

#### 1. Build the Application

```bash
npm run build
```

#### 2. Start the Server

```bash
npm start
```

## 🗃️ Database Management

### Running Migrations

```bash
# Run all pending migrations
npm run migration:run

# Revert the last migration
npm run migration:revert

# Show migration status
npm run migration:show

# Generate a new migration (after entity changes)
npm run migration:generate:name --name=YourMigrationName

# Create an empty migration file
npm run migration:create --name=YourMigrationName
```

### SQL Scripts

The project includes separate SQL scripts in the `scripts/` directory:

- **DDL** (`scripts/ddl/`): Data Definition Language - Table creation scripts
- **DML** (`scripts/dml/`): Data Manipulation Language - Seed data scripts
- **DQL** (`scripts/dql/`): Data Query Language - Query examples

### Manual Database Setup

You can also run the DDL script directly:

```bash
# Using psql
psql -U musicAdmin -d music_platform -f scripts/ddl/001_initial_schema.sql

# Or using Docker
docker exec -i music_platform_db psql -U musicAdmin -d music_platform < scripts/ddl/001_initial_schema.sql
```

## 📝 Available Scripts

```bash
# Development
npm run dev              # Start development server with hot-reload

# Building
npm run build            # Compile TypeScript to JavaScript

# Production
npm start                # Start production server

# Database
npm run migration:run    # Run pending migrations
npm run migration:revert # Revert last migration
npm run migration:show   # Show migration status
npm run migration:generate:name --name=MigrationName  # Generate migration
npm run migration:create --name=MigrationName        # Create empty migration

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint errors automatically

# Seeding (when implemented)
npm run seed             # Run database seeders
```

## 📚 API Documentation

Once the server is running, access the Swagger API documentation at:

```
http://localhost:3001/api-docs
```

The API documentation includes:
- All available endpoints
- Request/response schemas
- Example requests
- Authentication requirements

## 🏗️ Architecture

The project follows a **layered architecture** pattern:

1. **Routes** (`src/routes/`) - Define API endpoints and Swagger documentation
2. **Controllers** (`src/controllers/`) - Handle HTTP requests/responses, validation
3. **Services** (`src/services/`) - Business logic layer
4. **Repositories** (`src/repositories/`) - Database query layer (TypeORM)
5. **Entities** (`src/entities/`) - Database schema definitions
6. **DTOs** (`src/dtos/`) - Data Transfer Objects with validation rules
7. **Containers** (`src/containers/`) - Dependency injection setup

## 🔍 Health Check

The API includes health check endpoints:

- **Liveness**: `GET /api/health/liveness`
- **Readiness**: `GET /api/health/readiness`

## 🐳 Docker Services

### PostgreSQL Container

- **Container Name**: `music_platform_db`
- **Image**: `postgres:16`
- **Port**: `5433:5432` (host:container)
- **Database**: `music_platform`
- **User**: `musicAdmin`

### API Container

- **Container Name**: `music_platform_api`
- **Port**: `3001:3001`
- **Environment**: `ENV=docker`

## 🔐 Database Connection

### Local Development
- **Host**: `localhost`
- **Port**: `5433`
- **Database**: `music_platform`
- **User**: `musicAdmin`
- **Password**: `musicSecret`

### Docker/Production
- **Host**: `postgres` (service name)
- **Port**: `5432`
- **Database**: `music_platform`
- **User**: `musicAdmin`
- **Password**: `musicSecret`

## 📊 Database Features

- **Indexes**: All foreign key columns are indexed for optimal query performance
- **Constraints**: Foreign key constraints ensure referential integrity
- **ENUMs**: Used for role types, subscription plans, and statuses
- **Timestamps**: Automatic `created_at` timestamps on all tables

## 🧪 Testing

(To be implemented)

## 📄 License

ISC

## 🤝 Contributing

This is a course project. For questions or issues, please contact the team members.

## 📞 Support

For issues or questions:
- Check the API documentation at `/api-docs`
- Review the database schema in `scripts/ddl/001_initial_schema.sql`
- Check logs in `logs/app.log`

---

**Note**: This project is part of a Database Systems course at AUA (American University of Armenia).

