import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Empleado } from '@shared/interfaces/empleado.interface';

@Component({
  selector: 'app-usuarios-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './usuarios-form.html',
  styleUrls: ['./usuarios-form.scss']
})
export class UsuariosForm {
  @Input() empleado: Partial<Empleado> = {};
  @Input() soloLectura = false;
  @Input() modo: 'registro' | 'editar' | 'detalle' = 'registro';
  @Output() guardar = new EventEmitter<Empleado>();

  nombre = signal(this.empleado.nombre ?? '');
  apellido = signal(this.empleado.apellido ?? '');
  edad = signal(this.empleado.edad ?? '');
  dni = signal(this.empleado.dni ?? '');
  telefono = signal(this.empleado.telefono ?? '');
  email = signal(this.empleado.email ?? '');
  clave = signal(this.empleado.clave ?? '');
  rol = signal(this.empleado.rol ?? 6);

  onSubmit() {
    if (!this.soloLectura) {
      this.guardar.emit({
        ...this.empleado,
        nombre: this.nombre(),
        apellido: this.apellido(),
        edad: this.edad(),
        dni: this.dni(),
        telefono: this.telefono(),
        email: this.email(),
        clave: this.clave(),
        rol: String(this.rol())
      });
    }
  }
}
