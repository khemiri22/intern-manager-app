import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';

export const noAuthGuard: CanActivateFn = async  (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const tokenData = await authService.checkAuth().toPromise();
  if (tokenData) {
    return router.createUrlTree([tokenData.role === 'admin' ? '/admin' : '/intern']); // Redirect authenticated users to their home page
  }
  return true; // Allow access to public pages

};
