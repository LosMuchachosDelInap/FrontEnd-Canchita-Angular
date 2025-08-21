import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class OwnerGuard implements CanActivate {
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

        // Solo permitir acceso al Dueño
        const isOwner = this.authService.isOwner();
        
        if (!isOwner) {
          console.warn('Acceso denegado: Se requieren permisos de propietario');
          this.router.navigate(['/home']);
          return false;
        }

        return true;
      })
    );
  }
}
