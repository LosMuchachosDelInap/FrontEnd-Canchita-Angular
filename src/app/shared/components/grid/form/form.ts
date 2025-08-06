import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Empleado } from '@app/shared/interfaces/empleado.interface';

@Component({
  selector: 'app-empleado-form',
  standalone: true,
  imports: [
    NgIf,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './form.html',
  styleUrls: ['./form.scss']
})
export class EmpleadoFormComponent {
  @Input() empleado: Partial<Empleado> = {};
  @Input() soloLectura = false;
  @Input() modo: 'registro' | 'editar' | 'detalle' = 'registro';
  @Output() guardar = new EventEmitter<Empleado>();

  // Signals para los campos
  nombre = signal(this.empleado.nombre ?? '');
  apellido = signal(this.empleado.apellido ?? '');
  edad = signal(this.empleado.edad ?? '');
  dni = signal(this.empleado.dni ?? '');
  telefono = signal(this.empleado.telefono ?? '');
  email = signal(this.empleado.email ?? '');
  clave = signal(this.empleado.clave ?? ''); // <--- Cambiado de password a clave
  rol = signal(this.empleado.rol ?? 6); // 6 = Cliente por defecto

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
        clave: this.clave(), // <--- Cambiado de password a clave
        rol: this.rol()
      });
    }
  }
}
