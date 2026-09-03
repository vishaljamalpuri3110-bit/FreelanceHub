import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMsg = '';
  role: 'freelancer' | 'client' = 'freelancer';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['arpita@example.com', [Validators.required, Validators.email]],
      password: ['password123', [Validators.required]]
    });
  }

  setRole(selectedRole: 'freelancer' | 'client') {
    this.role = selectedRole;
    if (selectedRole === 'client') {
      this.loginForm.patchValue({ email: 'amit@example.com' });
    } else {
      this.loginForm.patchValue({ email: 'arpita@example.com' });
    }
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.value;

this.authService.login(email, password).subscribe({
  next: () => {
    this.errorMsg = '';
  },
  error: () => {
    this.errorMsg = 'Invalid email or password. Please try again.';
  }
});
  }
}
