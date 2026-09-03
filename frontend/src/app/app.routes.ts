import { Routes } from '@angular/router';

import { HomeComponent } from './components/public/home/home.component';
import { AboutComponent } from './components/public/about/about.component';
import { HowItWorksComponent } from './components/public/how-it-works/how-it-works.component';

import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';

import { FreelancerDashboardComponent } from './components/dashboards/freelancer-dashboard/freelancer-dashboard.component';
import { ClientDashboardComponent } from './components/dashboards/client-dashboard/client-dashboard.component';

import { FindFreelancersComponent } from './components/marketplace/find-freelancers/find-freelancers.component';
import { BrowseProjectsComponent } from './components/marketplace/browse-projects/browse-projects.component';
import { ProjectDetailsComponent } from './components/marketplace/project-details/project-details.component';
import { FreelancerProfileComponent } from './components/marketplace/freelancer-profile/freelancer-profile.component';

import { MyApplicationsComponent } from './components/collaboration/my-applications/my-applications.component';
import { MyProjectsComponent } from './components/collaboration/my-projects/my-projects.component';
import { WorkspaceComponent } from './components/collaboration/workspace/workspace.component';
import { PostProjectComponent } from './components/collaboration/post-project/post-project.component';

import { NotificationsComponent } from './components/shared/notifications/notifications.component';
import { SettingsComponent } from './components/shared/settings/settings.component';

import { authGuard } from './guards/auth.guard';

export const routes: Routes = [

  // =========================
  // PUBLIC ROUTES
  // =========================

  { path: '', component: HomeComponent },

  { path: 'about', component: AboutComponent },

  { path: 'how-it-works', component: HowItWorksComponent },


  // =========================
  // AUTH ROUTES
  // =========================

  { path: 'login', component: LoginComponent },

  { path: 'register', component: RegisterComponent },
  {
    path: 'freelancers',
    component: FindFreelancersComponent
  },

  {
    path: 'projects',
    component: BrowseProjectsComponent
  },
  {
    path: 'freelancer/dashboard',
    component: FreelancerDashboardComponent,
    canActivate: [authGuard],
    data: { role: 'freelancer' }
  },

  {
    path: 'freelancer/profile',
    component: FreelancerProfileComponent,
    canActivate: [authGuard],
    data: { role: 'freelancer' }
  },

  {
    path: 'freelancer/applications',
    component: MyApplicationsComponent,
    canActivate: [authGuard],
    data: { role: 'freelancer' }
  },

  {
    path: 'freelancer/:id',
    component: FreelancerProfileComponent
  },


  // =========================
  // PROJECT ROUTES
  // =========================
  // IMPORTANT:
  // Specific routes must come BEFORE :id

  {
    path: 'projects/my-projects',
    component: MyProjectsComponent,
    canActivate: [authGuard]
  },

  {
    path: 'projects/create',
    component: PostProjectComponent,
    canActivate: [authGuard],
    data: { role: 'client' }
  },

  {
    path: 'projects/:id',
    component: ProjectDetailsComponent
  },


  // =========================
  // CLIENT DASHBOARD
  // =========================

  {
    path: 'client/dashboard',
    component: ClientDashboardComponent,
    canActivate: [authGuard],
    data: { role: 'client' }
  },


  // =========================
  // COLLABORATION
  // =========================

  {
    path: 'collaboration/:id',
    component: WorkspaceComponent,
    canActivate: [authGuard]
  },


  // =========================
  // SHARED AUTHENTICATED ROUTES
  // =========================

  {
    path: 'notifications',
    component: NotificationsComponent,
    canActivate: [authGuard]
  },

  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [authGuard]
  },


  // =========================
  // FALLBACK
  // =========================

  {
    path: '**',
    redirectTo: ''
  }

];