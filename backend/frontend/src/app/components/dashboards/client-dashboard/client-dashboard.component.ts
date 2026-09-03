import { Component, OnInit, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AuthService } from '../../../services/auth.service';
import { ProjectService } from '../../../services/project.service';
import { FreelancerService } from '../../../services/freelancer.service';
import { ApplicationService } from '../../../services/application.service';

import { User, Project, Freelancer } from '../../../models';

@Component({
  selector: 'app-client-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.scss']
})
export class ClientDashboardComponent implements OnInit {

  currentUser: Signal<User | null>;

  activeProjects: Project[] = [];
  recommendedFreelancers: Freelancer[] = [];

  // REAL DASHBOARD STATS
  activeProjectsCount = 0;
  postedProjectsCount = 0;
  completedProjectsCount = 0;
  applicationsCount = 0;

  currentDate = new Date();

  constructor(
    private authService: AuthService,
    private projectService: ProjectService,
    private freelancerService: FreelancerService,
    private applicationService: ApplicationService
  ) {
    this.currentUser = this.authService.currentUser;
  }

  ngOnInit(): void {

    const user = this.currentUser();

    if (!user) {
      return;
    }

    // Load client's real projects
    this.projectService.getClientProjects(user.id).subscribe({

      next: projects => {

        // REAL TOTAL PROJECTS
        this.postedProjectsCount = projects.length;

        // REAL ACTIVE PROJECTS
        this.activeProjectsCount =
          projects.filter(
            p => p.status === 'in-progress' || p.status === 'open'
          ).length;

        // REAL COMPLETED PROJECTS
        this.completedProjectsCount =
          projects.filter(
            p => p.status === 'completed'
          ).length;

        // Projects shown in dashboard
        this.activeProjects =
          projects
            .filter(
              p => p.status === 'in-progress' || p.status === 'open'
            )
            .slice(0, 3);

        // COUNT APPLICATIONS FOR ALL CLIENT PROJECTS
        this.applicationsCount = 0;

        projects.forEach(project => {

          this.applicationService
            .getApplicationsByProject(project.id)
            .subscribe({

              next: applications => {
                this.applicationsCount += applications.length;

                console.log(
                  `Applications for ${project.title}:`,
                  applications.length
                );
              },

              error: error => {
                console.error(
                  `Failed to load applications for project ${project.id}:`,
                  error
                );
              }

            });

        });

        console.log('Client projects:', projects);
        console.log('Posted:', this.postedProjectsCount);
        console.log('Active:', this.activeProjectsCount);
        console.log('Completed:', this.completedProjectsCount);
      },

      error: error => {
        console.error('Failed to load client projects:', error);

        this.activeProjects = [];
        this.postedProjectsCount = 0;
        this.activeProjectsCount = 0;
        this.completedProjectsCount = 0;
        this.applicationsCount = 0;
      }

    });

    // Real freelancer data
    this.freelancerService.getFreelancers().subscribe({

      next: freelancers => {
        this.recommendedFreelancers = freelancers.slice(0, 3);
      },

      error: error => {
        console.error(
          'Failed to load recommended freelancers:',
          error
        );

        this.recommendedFreelancers = [];
      }

    });
  }
}