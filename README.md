# Online Grocery Shop — Backend API

A backend application built with **NestJS and TypeScript** for an online grocery shopping and rider-delivery system. This project is under development and currently includes authentication and rider-related modules.

## Tech Stack

* **Backend:** NestJS, TypeScript, Node.js
* **Database:** PostgreSQL
* **ORM:** TypeORM
* **Authentication:** JWT, Passport
* **Password Security:** bcrypt
* **Validation:** NestJS ValidationPipe
* **API Testing:** Postman

## Current Features

* Modular backend architecture
* Authentication module
* Rider management module
* PostgreSQL database integration
* Request validation
* CORS configuration for frontend integration
* Development mode with automatic restart

## Getting Started

### Prerequisites

Install Node.js, npm, PostgreSQL, and Git before running the project.

### 1. Clone the repository

```bash
git clone https://github.com/KamrulHasan2942/online_grocery_shop.git
cd online_grocery_shop
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure the database

The current database configuration uses PostgreSQL with the database name `riderDB` and port `5433`.

Ensure PostgreSQL is running and the database exists. Configure your own database credentials before starting the application.

**Security:** Store credentials in environment variables. Never commit real passwords, access tokens, or `.env` files to GitHub.

### 4. Run the application

```bash
npm run start:dev
```

The backend listens on port `3001` by default.

### 5. Test with Postman

Use the local base URL:

```text
http://localhost:3001
```

Refer to the application controllers for available endpoints. Protected endpoints may require a JWT access token.

## Useful Commands

| Command              | Description               |
| -------------------- | ------------------------- |
| `npm run start`      | Start the application     |
| `npm run start:dev`  | Start in development mode |
| `npm run build`      | Build the application     |
| `npm run start:prod` | Run the production build  |
| `npm run test`       | Run unit tests            |
| `npm run test:e2e`   | Run end-to-end tests      |
| `npm run test:cov`   | Generate test coverage    |
| `npm run lint`       | Run ESLint                |

## Project Structure

```text
src/
├── auth/       # Authentication module
├── rider/      # Rider-related functionality
├── app.module.ts
├── app.controller.ts
├── app.service.ts
└── main.ts
test/           # End-to-end tests
```

## Future Improvements

* Secure database configuration using environment variables
* Add automated tests for core features
* Document API endpoints and example requests
* Expand grocery shopping and delivery functionality
* Use database migrations for production
* Prepare the application for deployment

## Author

**Md Kamrul Hasan**

GitHub: [KamrulHasan2942](https://github.com/KamrulHasan2942)

## Project Status

Under active development.
