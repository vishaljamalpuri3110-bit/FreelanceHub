import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AuthService } from '../../../services/auth.service';
import { FreelancerService } from '../../../services/freelancer.service';

import { User, Profile } from '../../../models';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  user: User | null = null;

  activeTab = 'profile';

  successMsg = '';

  // Profile fields
  name = '';
  email = '';
  location = '';

  // Notification preferences
  notifications = {
    email: true,
    push: true,
    marketing: false
  };

  constructor(
    private authService: AuthService,
    private freelancerService: FreelancerService
  ) {}

  ngOnInit(): void {

    const u = this.authService.currentUser();

    if (!u) {
      return;
    }

    this.user = u;

    this.name = u.name;
    this.email = u.email;

    // Load real profile data
    this.freelancerService
      .getFreelancerById(u.id)
      .subscribe({

        next: profile => {
          this.location = profile.location || '';
        },

        error: error => {
          console.error(
            'Failed to load profile:',
            error
          );
        }

      });
  }

  saveProfile(): void {

    const u = this.authService.currentUser();

    if (!u) {
      return;
    }

    const request = {
      userId: Number(u.id),
      location: this.location,
      skills: undefined,
      hourlyRate: undefined,
      experienceLevel: undefined,
      bio: undefined,
      companyName: undefined,
      industry: undefined,
      companyDescription: undefined,
      profilePhoto: undefined,
      education: undefined,
      portfolio: undefined,
      availability: undefined,
      previousProjects: undefined,
      contactInformation: undefined
    };

    this.freelancerService
      .updateProfile(u.id, request)
      .subscribe({

        next: () => {

          this.successMsg =
            'Profile updated successfully.';

          setTimeout(() => {
            this.successMsg = '';
          }, 3000);

        },

        error: error => {

          console.error(
            'Failed to update profile:',
            error
          );

          this.successMsg =
            'Failed to update profile.';

          setTimeout(() => {
            this.successMsg = '';
          }, 3000);

        }

      });
  }

  saveNotifications(): void {

    this.successMsg =
      'Notification preferences saved locally.';

    setTimeout(() => {
      this.successMsg = '';
    }, 3000);
  }

  saveSecurity(): void {

    this.successMsg =
      'Password and 2FA settings require backend support.';

    setTimeout(() => {
      this.successMsg = '';
    }, 3000);
  }
}