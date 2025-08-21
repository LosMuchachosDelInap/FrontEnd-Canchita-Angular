import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  private authService = inject(AuthService);
  private router = inject(Router);

  canActivate(): Observable<boolean> {
    return this.authService.currentUser$.pipe(
      take(1),
      map(user => {
        if (!user) {
          this.router.navigate(['/auth/sign-in']);
          return false;
        }

        // Solo permitir acceso a Dueño y Administrador
        const isAdminOrOwner = this.authService.isAdminOrOwner();
        
        if (!isAdminOrOwner) {
          console.warn('Acceso denegado: Se requieren permisos de administrador');
          this.router.navigate(['/home']);
          return false;
        }

        return true;
      })
    );
  }
}
