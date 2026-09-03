import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User, LoginRequest, LoginResponse } from '../models';
import { Observable, tap, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly CURRENT_USER_KEY = 'currentUser';
  private readonly TOKEN_KEY = 'token';

  private readonly API_URL = 'http://localhost:8080';

  currentUser = signal<User | null>(this.getStoredUser());

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  private getStoredUser(): User | null {
    const storedUser = localStorage.getItem(this.CURRENT_USER_KEY);

    if (storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch {
        return null;
      }
    }

    return null;
  }

  login(email: string, password: string): Observable<User> {

    const request: LoginRequest = {
      email,
      password
    };

    return this.http.post<LoginResponse>(
      `${this.API_URL}/auth/login`,
      request
    ).pipe(

      tap(response => {
        localStorage.setItem(this.TOKEN_KEY, response.token);
      }),

      // After getting JWT, get the real logged-in user
      switchMap(() =>
        this.http.get<User>(`${this.API_URL}/users/me`)
      ),

      tap(user => {

        // Backend uses uppercase role,
        // Angular currently uses lowercase role.
        const angularUser: User = {
          ...user,
          id: String(user.id),
          role: user.role.toLowerCase() as 'freelancer' | 'client'
        };

        localStorage.setItem(
          this.CURRENT_USER_KEY,
          JSON.stringify(angularUser)
        );

        this.currentUser.set(angularUser);

        if (angularUser.role === 'freelancer') {
          this.router.navigate(['/freelancer/dashboard']);
        } else {
          this.router.navigate(['/client/dashboard']);
        }
      })
    );
  }

  logout(): void {

    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.CURRENT_USER_KEY);

    this.currentUser.set(null);

    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.currentUser() !== null &&
           localStorage.getItem(this.TOKEN_KEY) !== null;
  }

  isFreelancer(): boolean {
    return this.currentUser()?.role === 'freelancer';
  }

  isClient(): boolean {
    return this.currentUser()?.role === 'client';
  }
}