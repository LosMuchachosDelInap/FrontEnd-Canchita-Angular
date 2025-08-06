import { Component, signal } from '@angular/core';
//import { AuthService } from '@services/auth.service'
 import { AuthService } from '../../../services/auth.service'; // <-- ruta corregida
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    NgIf
  ],
  templateUrl: './sign-in.html',
  styleUrls: ['./sign-in.scss']
})
export class SignIn {
  email = signal('');
  clave = signal('');
  mensaje = signal('');

  constructor(private auth: AuthService) {}

  onSubmit() {
    this.auth.login({ email: this.email(), password: this.clave() }).subscribe({
      next: (res) => {
      if (res.success) {
        this.mensaje.set('¡Login exitoso!');
      } else {
        this.mensaje.set(res.message ?? 'Ocurrió un error desconocido');
      }
      },
      error: () => this.mensaje.set('Error de conexión')
    });
  }
}
