import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../../shared/services/auth.service';
import { UsuariosModalComponent } from '../../../shared/components/usuarios-modal/usuarios-modal.component';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatSnackBarModule
  ],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  /**
   * Abrir modal de login
   */
  openLoginModal() {
    const dialogRef = this.dialog.open(UsuariosModalComponent, {
      width: '400px',
      disableClose: false,
      data: {
        mode: 'login',
        title: 'Iniciar Sesión'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.success) {
        this.snackBar.open('¡Bienvenido!', 'Cerrar', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
        // Redirigir al dashboard después del login exitoso
        this.router.navigate(['/dashboard']);
      }
    });
  }

  /**
   * Abrir modal de registro
   */
  openRegisterModal() {
    const dialogRef = this.dialog.open(UsuariosModalComponent, {
      width: '400px',
      disableClose: false,
      data: {
        mode: 'register',
        title: 'Crear Nueva Cuenta'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.success) {
        this.snackBar.open('¡Cuenta creada exitosamente! Ya puedes iniciar sesión.', 'Cerrar', {
          duration: 5000,
          panelClass: ['success-snackbar']
        });
        // Mostrar modal de login después del registro exitoso
        setTimeout(() => {
          this.openLoginModal();
        }, 1000);
      }
    });
  }
}
