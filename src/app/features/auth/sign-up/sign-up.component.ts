import { Component, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { AuthService } from '@shared/services/auth.service';
import { FirebaseAuthService } from '@shared/services/firebase-auth.service';
import { UsuariosModalComponent } from '@shared/components/usuarios-modal/usuarios-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatSnackBarModule,
    RouterModule
  ],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  loading = signal(false);
  error = signal('');
  googleLoading = signal(false);
  form: ReturnType<FormBuilder['group']>;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private authService: AuthService,
    private firebaseAuth: FirebaseAuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
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
        if (result.autoLogin) {
          // Si el auto-login fue exitoso, redirigir al dashboard
          this.snackBar.open(result.message, 'Cerrar', {
            duration: 5000,
            panelClass: ['success-snackbar']
          });
          this.router.navigate(['/dashboard']);
        } else {
          // Si el registro fue exitoso pero no se pudo hacer auto-login
          this.snackBar.open(result.message, 'Cerrar', {
            duration: 5000,
            panelClass: ['success-snackbar']
          });
          this.router.navigate(['/auth/sign-in']);
        }
      }
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.loading.set(true);
      // Simula registro
      setTimeout(() => {
        this.loading.set(false);
        this.error.set('');
      }, 1000);
    }
  }

  /**
   * Registrarse con Google
   */
  async signUpWithGoogle() {
    this.googleLoading.set(true);
    this.error.set('');

    try {
      const result = await this.firebaseAuth.signInWithGoogle();
      
      if (result.success) {
        this.snackBar.open('¡Registro exitoso con Google!', 'Cerrar', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
        
        // Redirigir al dashboard o home
        this.router.navigate(['/home']);
      } else {
        this.error.set(result.message);
      }
    } catch (error) {
      console.error('Error en registro con Google:', error);
      this.error.set('Error al registrarse con Google. Intenta nuevamente.');
    } finally {
      this.googleLoading.set(false);
    }
  }
}
