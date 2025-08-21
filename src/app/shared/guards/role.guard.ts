import { Injectable, inject } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UserRole } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  private authService = inject(AuthService);
  private router = inject(Router);

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.authService.currentUser$.pipe(
      take(1),
      map(user => {
        if (!user) {
          // Si no hay usuario, redirigir al login
          this.router.navigate(['/auth/sign-in']);
          return false;
        }

        // Obtener roles permitidos de la ruta
        const allowedRoles = route.data?.['roles'] as UserRole[] || [];
        
        if (allowedRoles.length === 0) {
          // Si no se especifican roles, permitir acceso
          return true;
        }

        // Verificar si el usuario tiene alguno de los roles permitidos
        const userRole = this.authService.getCurrentUserRole();
        const hasPermission = userRole && allowedRoles.includes(userRole);

        if (!hasPermission) {
          // Redirigir a página de acceso denegado o home
          this.router.navigate(['/home']);
          return false;
        }

        return true;
      })
    );
  }
}
