import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ProjectService } from '../../../services/project.service';
import { AuthService } from '../../../services/auth.service';
import { ApplicationService } from '../../../services/application.service';

import { Project } from '../../../models';

@Component({
  selector: 'app-my-projects',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.scss']
})
export class MyProjectsComponent implements OnInit {

  projects: Project[] = [];
  loading = true;
  isClient = false;

  constructor(
    private projectService: ProjectService,
    private authService: AuthService,
    private applicationService: ApplicationService
  ) {}

  ngOnInit(): void {

    const user = this.authService.currentUser();

    this.isClient = user?.role === 'client';

    if (!user) {
      this.loading = false;
      return;
    }

    // ==========================
    // CLIENT
    // ==========================

    if (this.isClient) {

      this.projectService
        .getClientProjects(user.id)
        .subscribe({
          next: projects => {
            this.projects = projects;
            this.loading = false;
          },

          error: error => {
            console.error(
              'Failed to load client projects:',
              error
            );

            this.projects = [];
            this.loading = false;
          }
        });

      return;
    }


    // ==========================
    // FREELANCER
    // ==========================

    this.applicationService
      .getMyApplications()
      .subscribe({
        next: applications => {

          // Only projects where freelancer was accepted
          const acceptedApplications =
            applications.filter(
              application =>
                application.status?.toUpperCase() === 'ACCEPTED'
            );

          if (acceptedApplications.length === 0) {
            this.projects = [];
            this.loading = false;
            return;
          }

          // Fetch actual project details
          const projectRequests =
            acceptedApplications.map(application =>
              this.projectService.getProjectById(
                String(application.projectId)
              )
            );

          let loadedProjects: Project[] = [];

          projectRequests.forEach(request => {

            request.subscribe({
              next: project => {

                if (project) {
                  loadedProjects.push(project);
                }

                // Once all requests have completed
                if (
                  loadedProjects.length ===
                  acceptedApplications.length
                ) {
                  this.projects = loadedProjects;
                  this.loading = false;
                }

              },

              error: error => {
                console.error(
                  'Failed to load freelancer project:',
                  error
                );
              }
            });

          });

        },

        error: error => {

          console.error(
            'Failed to load freelancer applications:',
            error
          );

          this.projects = [];
          this.loading = false;
        }
      });
  }
}