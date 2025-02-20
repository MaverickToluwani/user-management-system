# Project Name

## Description
A brief description of the project and its purpose.

## Table of Contents
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Database Setup](#database-setup)
- [Accessing Swagger UI](#accessing-swagger-ui)
- [Contributors](#contributors)

## Getting Started
To get started with this project, ensure you have the following prerequisites installed:

- Node.js (Latest LTS version)
- npm or yarn
- MySQL (or any other preferred database)

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo.git
   cd your-project-name
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

## Running the Application
1. Start the development server:
   ```sh
   npm run start:dev
   ```
   For production:
   ```sh
   npm run start:prod
   ```

## Database Setup
1. Ensure your database instance is running.
2. The application is configured to automatically synchronize the database schema. Make sure `synchronize` is set to `true` in your configuration (app.modules.ts).
   ```typescript
   TypeOrmModule.forRoot({
     type: 'postgres',
     url: process.env.DATABASE_URL,
     synchronize: 'true',
     entities: [__dirname + '/../**/*.entity{.ts,.js}'],
   });
   ```
   **Note:** Be cautious using `synchronize: true` in production, as it can lead to data loss.

## Accessing Swagger UI
After running the server, access the Swagger documentation by navigating to:
```
http://localhost:3000/api/docs
```
This provides a UI to test and explore all available endpoints.

## Contributors
- **Toluwani Lekan-Afinni**
- **Jewel Eni**
- **Itang Itang Akanimo**
- **Kelechi Ezemandu**
- **Olawale Dipo-Isijola**
- **Victor Adeyemi**
- **Amina Sagir Mahmu**

