import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';

import { ProjectService } from '../../../services/project.service';
import { AuthService } from '../../../services/auth.service';
import { Project } from '../../../models';

interface ApplicationResponse {
  id: number;
  projectId: number;
  projectTitle: string;
  freelancerId: number;
  freelancerName: string;
  coverLetter?: string;
  proposedBudget: number;
  status: string;
  createdAt?: string;
  updatedAt?: string;
}

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {

  project: Project | undefined;

  loading = true;
  applying = false;
  hasApplied = false;
  isClient = false;

  applications: ApplicationResponse[] = [];
  loadingApplications = false;
  processingApplicationId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {

    this.isClient = this.authService.isClient();

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {

      this.projectService.getProjectById(id).subscribe({
        next: p => {

          this.project = p;
          this.loading = false;

          // Check whether current freelancer has already applied
          this.checkIfApplied();

          // Load applications for applicant count
          // This works for both Client and Freelancer
          this.loadApplications(id);

        },

        error: error => {

          console.error(
            'Failed to load project:',
            error
          );

          this.loading = false;
        }
      });

    } else {

      this.loading = false;

    }
  }

  checkIfApplied(): void {

    const user = this.authService.currentUser();

    if (
      user &&
      user.role === 'freelancer' &&
      this.project
    ) {

      this.projectService
        .getFreelancerApplications(user.id)
        .subscribe(apps => {

          this.hasApplied = apps.some(
            a => a.projectId === this.project?.id
          );

        });
    }
  }

  loadApplications(projectId: string): void {

    this.loadingApplications = true;

    this.projectService
      .getProjectApplications(projectId)
      .subscribe({

        next: applications => {

          this.applications = applications;

          this.loadingApplications = false;

          // Update applicant count for both Client and Freelancer
          if (this.project) {
            this.project.applicantsCount =
              applications.length;
          }

        },

        error: error => {

          console.error(
            'Failed to load applications:',
            error
          );

          this.loadingApplications = false;
        }

      });
  }

  acceptApplication(applicationId: number): void {

    this.processingApplicationId = applicationId;

    this.projectService
      .acceptApplication(String(applicationId))
      .subscribe({

        next: updatedApplication => {

          const application =
            this.applications.find(
              a => a.id === applicationId
            );

          if (application) {
            application.status = 'ACCEPTED';
          }

          if (this.project) {
            this.project.status = 'in-progress';
          }

          this.processingApplicationId = null;

        },

        error: error => {

          console.error(
            'Failed to accept application:',
            error
          );

          this.processingApplicationId = null;

        }

      });
  }

  rejectApplication(applicationId: number): void {

    this.processingApplicationId = applicationId;

    this.projectService
      .rejectApplication(String(applicationId))
      .subscribe({

        next: updatedApplication => {

          const application =
            this.applications.find(
              a => a.id === applicationId
            );

          if (application) {
            application.status = updatedApplication.status;
          }

          this.processingApplicationId = null;

        },

        error: error => {

          console.error(
            'Failed to reject application:',
            error
          );

          this.processingApplicationId = null;

          alert(
            error.error?.message ||
            'Failed to reject application'
          );

        }

      });
  }

  apply(): void {

    const user = this.authService.currentUser();

    if (!user) {
      this.router.navigate(['/login']);
      return;
    }

    if (user.role !== 'freelancer') {
      return;
    }

    if (!this.project) {
      return;
    }

    this.applying = true;

    this.projectService
      .applyForProject({

        projectId: this.project.id,
        projectTitle: this.project.title,

        freelancerId: user.id,
        freelancerName: user.name,

        clientId: this.project.clientId,
        clientName: this.project.clientName,

        budget: this.project.budget,
        proposedBudget: this.project.budget

      })
      .subscribe({

        next: () => {

          this.applying = false;
          this.hasApplied = true;

          if (this.project) {
            this.project.applicantsCount++;
          }

        },

        error: error => {

          this.applying = false;

          console.error(
            'Application failed:',
            error
          );

          alert(
            error.error?.message ||
            'Failed to apply for project'
          );

        }

      });
  }

  getProjectDuration(): string {

    if (!this.project?.deadline) {
      return '';
    }

    const startDate = this.project.createdAt
      ? new Date(this.project.createdAt)
      : new Date();

    const deadline =
      new Date(this.project.deadline);

    const difference =
      deadline.getTime() -
      startDate.getTime();

    const days = Math.ceil(
      difference /
      (1000 * 60 * 60 * 24)
    );

    if (days <= 0) {
      return 'Deadline reached';
    }

    if (days < 30) {
      return `${days} days`;
    }

    const months = Math.round(days / 30);

    return `${months} month${months > 1 ? 's' : ''}`;
  }
}