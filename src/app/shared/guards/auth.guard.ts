import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  
  if (!authService.isAuthenticated()) {
    router.navigate(['/auth/login']);
    return false;
  }
  
  if (!authService.isAdminOrOwner()) {
    router.navigate(['/unauthorized']);
    return false;
  }
  
  return true;
};

export const ownerGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  
  if (!authService.isAuthenticated()) {
    router.navigate(['/auth/login']);
    return false;
  }
  
  if (!authService.isOwner()) {
    router.navigate(['/unauthorized']);
    return false;
  }
  
  return true;
};

export const adminOrOwnerGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  
  if (!authService.isAuthenticated()) {
    router.navigate(['/auth/login']);
    return false;
  }
  
  if (!authService.isAdminOrOwner()) {
    router.navigate(['/unauthorized']);
    return false;
  }
  
  return true;
};
  
  router.navigate(['/unauthorized']);
  return false;
};
