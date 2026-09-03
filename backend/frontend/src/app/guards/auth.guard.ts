import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    // Check role specific routes
    const expectedRole = route.data['role'];
    if (expectedRole && authService.currentUser()?.role !== expectedRole) {
      // Redirect to correct dashboard
      const correctRoute = authService.currentUser()?.role === 'freelancer' ? '/freelancer/dashboard' : '/client/dashboard';
      router.navigate([correctRoute]);
      return false;
    }
    return true;
  }

  router.navigate(['/login']);
  return false;
};
