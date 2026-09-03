import { Component, OnInit, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AuthService } from '../../../services/auth.service';
import { ProjectService } from '../../../services/project.service';
import { ApplicationService } from '../../../services/application.service';
import { NotificationService } from '../../../services/notification.service';

import { User, Project, Notification } from '../../../models';

@Component({
  selector: 'app-freelancer-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './freelancer-dashboard.component.html',
  styleUrls: ['./freelancer-dashboard.component.scss']
})
export class FreelancerDashboardComponent implements OnInit {

  currentUser: Signal<User | null>;

  recommendedProjects: Project[] = [];

  // REAL DASHBOARD STATS
  activeProjectsCount = 0;
  applicationsCount = 0;
  completedProjectsCount = 0;

  // Earnings is not available from backend yet
  earnings = 'N/A';

  // REAL RECENT ACTIVITY
  recentActivities: Notification[] = [];

  currentDate = new Date();

  constructor(
    private authService: AuthService,
    private projectService: ProjectService,
    private applicationService: ApplicationService,
    private notificationService: NotificationService
  ) {
    this.currentUser = this.authService.currentUser;
  }

  ngOnInit(): void {

    // ==============================
    // RECOMMENDED PROJECTS
    // ==============================

    this.projectService.getProjects().subscribe({
      next: projects => {
        this.recommendedProjects = projects.slice(0, 3);
      },

      error: error => {
        console.error(
          'Failed to load recommended projects:',
          error
        );

        this.recommendedProjects = [];
      }
    });


    // ==============================
    // FREELANCER APPLICATIONS
    // ==============================

    this.applicationService.getMyApplications().subscribe({
      next: applications => {

        this.applicationsCount = applications.length;

        const acceptedApplications =
          applications.filter(
            application =>
              application.status?.toUpperCase() === 'ACCEPTED'
          );

        acceptedApplications.forEach(application => {

          this.projectService
            .getProjectById(String(application.projectId))
            .subscribe({
              next: project => {

                if (!project) {
                  return;
                }

                if (project.status === 'in-progress') {
                  this.activeProjectsCount++;
                }

                if (project.status === 'completed') {
                  this.completedProjectsCount++;
                }

              },

              error: error => {
                console.error(
                  `Failed to load project ${application.projectId}:`,
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

        this.applicationsCount = 0;
        this.activeProjectsCount = 0;
        this.completedProjectsCount = 0;
      }
    });


    // ==============================
    // RECENT ACTIVITY
    // ==============================

    const user = this.currentUser();

    if (user) {

      this.notificationService
        .getUserNotifications(user.id)
        .subscribe({
          next: notifications => {

            // Show latest 3 notifications
            this.recentActivities =
              notifications.slice(0, 3);

          },

          error: error => {

            console.error(
              'Failed to load recent activity:',
              error
            );

            this.recentActivities = [];

          }
        });

    }

  }
}