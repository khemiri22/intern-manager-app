import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const tokenData = await authService.checkAuth().toPromise();
  if (tokenData) {
    const requiredRole = route.data['role'] as 'admin' | 'intern';
    if (tokenData.role === requiredRole) {
      return true; // Allow access if the user's role matches the required role
    }
    return router.createUrlTree([tokenData.role === 'admin' ? '/admin' : '/intern']); // Redirect to their home page
  } else {
    return router.createUrlTree(['/login']); // Redirect to login if not authenticated
  }
};
