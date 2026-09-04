# Freelancer Collaboration Platform

A full-stack freelancer collaboration platform built with **Spring Boot** and **Angular**. The platform connects clients and freelancers, allowing clients to post projects and manage applications while freelancers can discover projects, apply, manage tasks, and collaborate through project workspaces.

## 🚀 Tech Stack

### Backend

* Java 17+
* Spring Boot
* Spring Security
* JWT Authentication
* Spring Data JPA
* Hibernate
* MySQL / MariaDB
* Maven

### Frontend

* Angular
* TypeScript
* Bootstrap
* HTML5
* SCSS
* RxJS

## ✨ Features

### Authentication & Authorization

* User registration
* Login with JWT authentication
* Role-based access control
* Freelancer and Client roles
* Protected routes and API endpoints

### Freelancer

* View and search available projects
* Search freelancers
* View freelancer profiles
* Apply for projects
* View submitted applications
* Track application status
* View assigned tasks
* Update task status
* View notifications
* Access collaboration workspaces

### Client

* Create projects
* View and manage own projects
* View project applicants
* Accept or reject applications
* View recommended freelancers
* Manage project tasks
* Track project collaboration
* Receive notifications

### Collaboration

* Project workspace
* Project team members
* Task management
* Task assignment
* Task status tracking
* Project progress based on tasks
* Application notifications

## 📁 Project Structure

```text
FreelanceHub/
|
│── ├── backend/
│   │   ├── src/
│   │   └── pom.xml
│   │
│── ├── frontend/
│   │   ├── src/
│   │   ├── public/
│   │   ├── angular.json
│   │   ├── package.json
│   │   └── package-lock.json
│   │
│   └── database/
│       └── freelancer_platform_clean.sql
│
└── README.md
```

## ⚙️ Prerequisites

Make sure the following are installed:

* JDK 17 or higher
* Maven
* Node.js and npm
* Angular CLI
* MySQL or MariaDB

## 🗄️ Database Setup

1. Start MySQL/MariaDB.
2. Create a database for the application.
3. Import:

```text
database/freelancer_platform_clean.sql
```

4. Configure the database connection in the backend `application.properties`.

Example:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/freelancer_platform
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD
```

**Do not commit real database passwords or JWT secrets to GitHub.**

## ▶️ Running the Backend

Open a terminal in:

```text
FreelanceHub/backend
```

Run:

```bash
mvn spring-boot:run
```

Backend will be available at:

```text
http://localhost:8080
```

## ▶️ Running the Frontend

Open another terminal in:

```text
FreelanceHUb/frontend
```

Install dependencies:

```bash
npm install
```

Start Angular:

```bash
ng serve
```

Frontend will be available at:

```text
http://localhost:4200
```

## 🔐 Authentication

The application uses JWT-based authentication.

After login, the frontend stores the JWT and sends it with protected API requests using the authorization header:

```text
Authorization: Bearer <JWT_TOKEN>
```

The Angular application uses an HTTP interceptor to automatically attach the token to protected requests.

## 🔄 Application Flow

```text
Client
  │
  ├── Register / Login
  ├── Create Project
  ├── Receive Applications
  └── Accept Freelancer
          │
          ▼
     Project Workspace
          │
          ├── Team
          ├── Tasks
          ├── Task Status
          └── Notifications
          
Freelancer
  │
  ├── Register / Login
  ├── Browse Projects
  ├── Apply
  ├── Track Applications
  ├── Manage Tasks
  └── Collaborate in Workspace
```

## 📌 API Base URLs

Backend:

```text
http://localhost:8080
```

Frontend:

```text
http://localhost:4200
```

## 🧪 Development Notes

This project is intended for learning and academic development while following a layered Spring Boot backend architecture.

Backend layers include:

```text
Controller
   ↓
Service
   ↓
Repository
   ↓
Database
```

The backend also includes:

* DTOs
* Validation
* Exception handling
* JWT security
* Role-based authorization
* JPA/Hibernate relationships

## 🚧 Future Improvements

Planned improvements include:

* Real-time messaging
* Payment and earnings system
* Profile editing improvements
* Password change
* Two-factor authentication
* Pagination and advanced filtering
* Automated testing
* Swagger/OpenAPI documentation
* Docker deployment
* Production environment configuration
* CI/CD pipeline

