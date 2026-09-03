import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ProjectService } from '../../../services/project.service';
import { AuthService } from '../../../services/auth.service';
import { Application } from '../../../models';

@Component({
  selector: 'app-my-applications',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './my-applications.component.html',
  styleUrls: ['./my-applications.component.scss']
})
export class MyApplicationsComponent implements OnInit {

  applications: Application[] = [];
  loading = true;

  constructor(
    private projectService: ProjectService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {

    const user = this.authService.currentUser();

    if (user && user.role === 'freelancer') {

      this.projectService
        .getFreelancerApplications(user.id)
        .subscribe({
          next: apps => {
            this.applications = apps;
            this.loading = false;
          },
          error: error => {
            console.error('Failed to load applications:', error);
            this.loading = false;
          }
        });

    } else {
      this.loading = false;
    }
  }
}