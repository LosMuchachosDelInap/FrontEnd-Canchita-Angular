import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { UsuariosModalComponent } from '../../shared/components/usuarios-modal/usuarios-modal.component';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/interfaces/auth.interface';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, RouterLink, CommonModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  @Output() abrirSidenav = new EventEmitter<void>();

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

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.success) {
        console.log('Login exitoso:', result);
        console.log('User data recibido:', result.data?.user);
        // Verificar estructura del usuario
        if (result.data?.user) {
          console.log('Campos del usuario:', Object.keys(result.data.user));
          console.log('Nombre:', result.data.user.nombre);
          console.log('Apellido:', result.data.user.apellido);
        }
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

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Registro exitoso:', result);
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
      // Usar nombre y apellido reales del backend
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
      
      return 'Usuario';
    }
    return '';
  }
}
