import { Component, signal } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    NgIf
  ],
  templateUrl: './sign-up.html',
  styleUrls: ['./sign-up.scss']
})
export class SignUp {
  nombre = signal('');
  apellido = signal('');
  edad = signal('');
  dni = signal('');
  telefono = signal('');
  email = signal('');
  clave = signal('');
  mensaje = signal('');

  constructor(private auth: AuthService) {}

  setSignal(signalFn: (v: string) => void, event: Event) {
    const input = event.target as HTMLInputElement | null;
    if (input) signalFn(input.value);
  }

  onSubmit() {
    const datos = {
      nombre: this.nombre(),
      apellido: this.apellido(),
      edad: this.edad(),
      dni: this.dni(),
      telefono: this.telefono(),
      email: this.email(),
      clave: this.clave(),
      rol: 6
    };
    // Ajustar el objeto datos para usar 'password' en lugar de 'clave'
    const datosRegistro = {
      nombre: this.nombre(),
      apellido: this.apellido(),
      edad: this.edad(),
      dni: this.dni(),
      telefono: this.telefono(),
      email: this.email(),
      password: this.clave(),
      rol: 6
    };

    this.auth.register(datosRegistro).subscribe({
      next: (res: any) => {
      if (res.success) {
        this.mensaje.set('¡Registro exitoso!');
      } else {
        this.mensaje.set(res.message);
      }
      },
      error: () => this.mensaje.set('Error de conexión')
    });
  }
}
