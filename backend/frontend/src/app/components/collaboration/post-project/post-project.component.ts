import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectService } from '../../../services/project.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-post-project',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './post-project.component.html',
  styleUrls: ['./post-project.component.scss']
})
export class PostProjectComponent {
  projectForm: FormGroup;
  successMsg = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private projectService: ProjectService,
    private authService: AuthService
  ) {
    this.projectForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      budget: ['', [Validators.required, Validators.min(1)]],
      projectType: ['fixed', Validators.required],
      experienceLevel: ['intermediate', Validators.required],
      skills: ['', Validators.required],
      deadline: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.projectForm.invalid) {
      this.projectForm.markAllAsTouched();
      return;
    }

    const user = this.authService.currentUser();
    if (!user || user.role !== 'client') return;

    const formVal = this.projectForm.value;
    const skillsArray = formVal.skills.split(',').map((s: string) => s.trim()).filter((s: string) => s.length > 0);

    const newProject = {
      title: formVal.title,
      description: formVal.description,
      clientId: user.id,
      clientName: user.name,
      budget: formVal.budget,
      projectType: formVal.projectType,
      experienceLevel: formVal.experienceLevel,
      requiredSkills: skillsArray,
      category: formVal.category,
      deadline: new Date(formVal.deadline).toISOString()
    };

    this.projectService.createProject(newProject).subscribe(() => {
      this.successMsg = 'Project posted successfully! Redirecting to dashboard...';
      setTimeout(() => {
        this.router.navigate(['/client/dashboard']);
      }, 2000);
    });
  }
}
