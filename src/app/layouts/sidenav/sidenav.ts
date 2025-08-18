import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialog } from '@angular/material/dialog';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { UsuariosModalComponent } from '../../shared/components/usuarios-modal/usuarios-modal.component';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/interfaces/auth.interface';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [MatSidenavModule, MatIconModule, MatButtonModule, MatDividerModule, RouterLink, CommonModule],
  templateUrl: './sidenav.html',
  styleUrls: ['./sidenav.css']
})
export class SidenavComponent implements OnInit, OnDestroy {
  @Input() opened = false;

  // Estado de autenticación
  currentUser: User | null = null;
  isAuthenticated = false;
  
  private destroy$ = new Subject<void>();

  constructor(
    private dialog: MatDialog,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // Suscribirse al estado de autenticación
    this.authService.currentUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        this.currentUser = user;
        this.isAuthenticated = !!user;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  openLoginModal() {
    const dialogRef = this.dialog.open(UsuariosModalComponent, {
      width: '450px',
      data: {
        mode: 'login'
      }
    });
  }

  openRegisterModal() {
    const dialogRef = this.dialog.open(UsuariosModalComponent, {
      width: '450px',
      data: {
        mode: 'register'
      }
    });
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        console.log('Sesión cerrada exitosamente');
      },
      error: (error) => {
        console.error('Error al cerrar sesión:', error);
        // Limpiar localmente aunque falle en el servidor
        this.authService.clearCurrentUser();
      }
    });
  }

  getUserDisplayName(): string {
    if (this.currentUser) {
      const nombre = this.currentUser.nombre || '';
      const apellido = this.currentUser.apellido || '';
      
      if (nombre && apellido) {
        return `${nombre} ${apellido}`;
      } else if (nombre) {
        return nombre;
      } else if (this.currentUser.email) {
        // Solo como último recurso usar el email
        const emailUser = this.currentUser.email.split('@')[0];
        return emailUser;
      }
    }
    return 'Usuario';
  }

  getUserRole(): string {
    return this.currentUser?.nombre_rol || 'Usuario';
  }
}
