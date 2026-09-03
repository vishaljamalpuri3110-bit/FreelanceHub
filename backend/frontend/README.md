# FreelancerHub

A modern, responsive Freelancer Collaboration Platform frontend built with Angular 18 and Bootstrap 5.

## Overview

FreelancerHub connects clients with top freelance talent. It provides features for finding projects, hiring freelancers, managing applications, and a dedicated workspace for collaboration on active tasks.

This is a frontend-only implementation with simulated backend interactions using mock data and RxJS `of` / `delay` observables.

## Key Features

- **Public Pages:** Home, About, How it Works.
- **Authentication:** Login, Register (with Freelancer/Client role selection). Route guards protect authenticated pages.
- **Role-Based Dashboards:** Distinct dashboards for Clients and Freelancers showing relevant statistics and quick actions.
- **Marketplace:** Browse Projects and Find Freelancers with filtering capabilities.
- **Collaboration Workspace:** 
  - Kanban board for managing tasks (To Do, In Progress, Done).
  - Team member view.
- **Project Management:** Create new projects (Clients), Apply to projects (Freelancers), View active and completed projects.
- **User Settings & Notifications:** Mock notifications panel and user profile settings.

## Technology Stack

- **Framework:** Angular 18 (Standalone Components)
- **Styling:** Bootstrap 5, Bootstrap Icons, Custom SCSS for primary accent color (Modern Purple/Blue).
- **Routing:** Angular Router with AuthGuard.
- **Forms:** Angular Reactive Forms.
- **Data Simulation:** RxJS for mocked API calls, Angular Services for state management.

## Getting Started

1. Ensure you have Node.js and npm installed.
2. Clone this repository.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run start
   ```
   Or using Angular CLI directly:
   ```bash
   npx ng serve
   ```
5. Open your browser and navigate to `http://localhost:4200/`.

## Demo Users

The app supports two main roles. You can log in using the demo accounts (password can be anything):

**Freelancer:**
- Email: `arpita@example.com`

**Client:**
- Email: `amit@example.com`

## Folder Structure

- `src/app/models`: TypeScript interfaces and the `mock-data.ts` repository.
- `src/app/services`: Services to interact with mock data and manage state.
- `src/app/guards`: Route guards (e.g., AuthGuard).
- `src/app/components`:
  - `shared`: Navbar, Footer, Notifications, Settings.
  - `public`: Home, About, How It Works.
  - `auth`: Login, Register.
  - `dashboards`: Freelancer, Client.
  - `marketplace`: Browse Projects, Project Details, Find Freelancers, Freelancer Profile.
  - `collaboration`: My Projects, My Applications, Workspace, Post Project.

## Future Enhancements (Backend Ready)

The `services` layer is structured to resemble a real REST API client. When a real backend is ready, the mock data and `of()` observables can be seamlessly replaced with Angular `HttpClient` calls without altering the components.
