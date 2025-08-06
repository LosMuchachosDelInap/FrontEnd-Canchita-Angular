import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { PermissionsService } from '@services/permissions.service';
import { AuthService } from '../../services/auth.service';

export const createEmployeeGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const permissionsService = inject(PermissionsService);
  const authService = inject(AuthService);
  
  if (!authService.isAuthenticated()) {
    router.navigate(['/auth/login']);
    return false;
  }
  
  const currentUserRole = authService.getCurrentUserRole();
  
  // Verificar si puede crear empleados
  if (!permissionsService.canCreateEmployee(currentUserRole)) {
    router.navigate(['/unauthorized']);
    return false;
  }
  
  return true;
};

export const editEmployeeGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const permissionsService = inject(PermissionsService);
  const authService = inject(AuthService);
  
  if (!authService.isAuthenticated()) {
    router.navigate(['/auth/login']);
    return false;
  }
  
  const currentUserRole = authService.getCurrentUserRole();
  
  // Verificar si puede editar empleados
  if (!permissionsService.canEditEmployee(currentUserRole)) {
    router.navigate(['/unauthorized']);
    return false;
  }
  
  return true;
};

export const deleteEmployeeGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const permissionsService = inject(PermissionsService);
  const authService = inject(AuthService);
  
  if (!authService.isAuthenticated()) {
    router.navigate(['/auth/login']);
    return false;
  }
  
  const currentUserRole = authService.getCurrentUserRole();
  
  // Verificar si puede eliminar empleados
  if (!permissionsService.canDeleteEmployee(currentUserRole)) {
    router.navigate(['/unauthorized']);
    return false;
  }
  
  return true;
};
