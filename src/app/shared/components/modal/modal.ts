import { Component, signal, ChangeDetectorRef, effect } from '@angular/core';
import { SignIn } from '@features/auth/sign-in/sign-in';
import { SignUp } from '@features/auth/sign-up/sign-up';
import { EmpleadoFormComponent } from '@components/grid/form/form';
import { MatDialogModule } from '@angular/material/dialog';
import { NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import { Empleado } from '@shared/interfaces/empleado.interface';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    MatDialogModule,
    SignIn,
    SignUp,
    EmpleadoFormComponent,
    NgIf,
    NgSwitch,
    NgSwitchCase
  ],
  templateUrl: './modal.html'
})
export class ModalComponent {
  formType = signal<'login' | 'register' | 'editar' | 'detalle'>('login');
  mensajeGlobal = signal('');
  empleadoSeleccionado = signal<Empleado | null>(null);

  constructor(private cdr: ChangeDetectorRef) {
    effect(() => {
      this.mensajeGlobal.set('');
      // Aquí podrías inicializar otros datos si lo necesitas
      console.log('Formulario cambiado a:', this.formType());
    });
  }

  setFormType(type: 'login' | 'register' | 'editar' | 'detalle', empleado?: Empleado) {
    this.formType.set(type);
    if (empleado) {
      this.empleadoSeleccionado.set(empleado);
    } else {
      this.empleadoSeleccionado.set(null);
    }
    this.cdr.detectChanges();
  }

  onGuardarEmpleado(empleado: Empleado) {
    // Aquí va la lógica para guardar o actualizar el empleado
    this.mensajeGlobal.set('Empleado guardado correctamente');
    // Puedes cerrar el modal o resetear el formulario si lo deseas
  }
}
