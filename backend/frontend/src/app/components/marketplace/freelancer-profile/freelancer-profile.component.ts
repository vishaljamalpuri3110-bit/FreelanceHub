
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ActivatedRoute,
  RouterModule
} from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';

import { FreelancerService } from '../../../services/freelancer.service';
import { AuthService } from '../../../services/auth.service';
import { Freelancer } from '../../../models';

@Component({
  selector: 'app-freelancer-profile',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  templateUrl: './freelancer-profile.component.html',
  styleUrls: ['./freelancer-profile.component.scss']
})
export class FreelancerProfileComponent implements OnInit {

  freelancer: Freelancer | undefined;

  loading = true;
  isOwner = false;

  editing = false;
  saving = false;
  saveError = '';

  profileForm!: FormGroup;


  constructor(
    private route: ActivatedRoute,
    private freelancerService: FreelancerService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {}


  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    const currentUser =
      this.authService.currentUser();

    // If there is no ID in the URL,
    // use the currently logged-in user.
    const targetId =
      id || currentUser?.id;


    if (!targetId) {

      this.loading = false;

      return;
    }


    // Check whether this is the logged-in user's profile.
    if (
      currentUser &&
      currentUser.id === targetId
    ) {

      this.isOwner = true;

    }


    this.loadProfile(targetId);
  }



  private loadProfile(userId: string): void {

    this.loading = true;


    this.freelancerService
      .getFreelancerById(userId)
      .subscribe({

        next: (freelancer) => {

          this.freelancer = freelancer;

          this.createForm(freelancer);

          this.loading = false;

        },


        error: (error) => {

          console.error(
            'Failed to load profile:',
            error
          );

          this.freelancer = undefined;

          this.loading = false;

        }

      });

  }



  private createForm(
    freelancer: Freelancer
  ): void {

    this.profileForm =
      this.fb.group({

        location: [
          freelancer.location || '',
          Validators.required
        ],


        skills: [
          freelancer.skills?.join(', ') || ''
        ],


        hourlyRate: [
          freelancer.hourlyRate || null,
          [
            Validators.required,
            Validators.min(1)
          ]
        ],


        experienceLevel: [
          freelancer.title || ''
        ],


        bio: [
          freelancer.about || ''
        ],


        profilePhoto: [
          freelancer.avatarUrl || ''
        ],


        availability: [
          freelancer.availability || ''
        ],


        education: [
          this.getEducationText(freelancer)
        ],


        portfolio: [
          this.getPortfolioText(freelancer)
        ],


        previousProjects: [
          ''
        ],


        contactInformation: [
          ''
        ]

      });

  }



  private getEducationText(
    freelancer: Freelancer
  ): string {

    if (
      !freelancer.education ||
      freelancer.education.length === 0
    ) {

      return '';

    }


    return freelancer.education
      .map(edu =>
        `${edu.degree} - ${edu.institution} (${edu.year})`
      )
      .join('\n');

  }



  private getPortfolioText(
    freelancer: Freelancer
  ): string {

    if (
      !freelancer.portfolio ||
      freelancer.portfolio.length === 0
    ) {

      return '';

    }


    return freelancer.portfolio
      .map(item => {

        const link =
          item.link
            ? ` - ${item.link}`
            : '';

        return `${item.title}: ${item.description}${link}`;

      })
      .join('\n');

  }



  editProfile(): void {

    if (!this.isOwner) {

      return;

    }


    this.editing = true;

    this.saveError = '';

  }



  cancelEdit(): void {

    this.editing = false;

    this.saveError = '';


    if (this.freelancer) {

      this.createForm(
        this.freelancer
      );

    }

  }



  saveProfile(): void {

    if (!this.profileForm.valid) {

      this.profileForm.markAllAsTouched();

      return;

    }


    const currentUser =
      this.authService.currentUser();


    if (!currentUser) {

      this.saveError =
        'User is not logged in.';

      return;

    }


    this.saving = true;

    this.saveError = '';


    const formValue =
      this.profileForm.value;


    const request = {

      userId:
        Number(currentUser.id),

      location:
        formValue.location,

      skills:
        formValue.skills,

      hourlyRate:
        Number(formValue.hourlyRate),

      experienceLevel:
        formValue.experienceLevel,

      bio:
        formValue.bio,

      profilePhoto:
        formValue.profilePhoto,

      education:
        formValue.education,

      portfolio:
        formValue.portfolio,

      availability:
        formValue.availability,

      previousProjects:
        formValue.previousProjects,

      contactInformation:
        formValue.contactInformation,

      companyName:
        null,

      industry:
        null,

      companyDescription:
        null

    };


    this.freelancerService
      .updateProfile(
        currentUser.id,
        request
      )
      .subscribe({

        next: (updatedFreelancer) => {

          this.freelancer =
            updatedFreelancer;

          this.createForm(
            updatedFreelancer
          );

          this.editing = false;

          this.saving = false;

          this.saveError = '';

        },


        error: (error) => {

          console.error(
            'Failed to update profile:',
            error
          );


          this.saveError =
            error?.error?.message ||
            'Failed to update profile. Please try again.';


          this.saving = false;
        }
      });}
}
