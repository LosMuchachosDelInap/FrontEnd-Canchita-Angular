import { Component, signal, ChangeDetectorRef, effect } from '@angular/core';
import { SignIn } from '@features/auth/sign-in/sign-in';
import { SignUp } from '@features/auth/sign-up/sign-up';
import { UsuariosForm } from '@shared/components/grid/usuarios-form/usuarios-form';
import { MatDialogModule } from '@angular/material/dialog';
import { Empleado } from '@shared/interfaces/empleado.interface';

@Component({
  selector: 'app-usuarios-modal',
  standalone: true,
  imports: [
    MatDialogModule,
    SignUp,
    SignIn,
    UsuariosForm
  ],
  templateUrl: './usuarios-modal.html'
})
export class UsuariosModalComponent {
  formType = signal<'login' | 'register' | 'editar' | 'detalle'>('login');
  mensajeGlobal = signal('');
  empleadoSeleccionado = signal<Empleado | null>(null);

  constructor(private cdr: ChangeDetectorRef) {
    effect(() => {
      this.mensajeGlobal.set('');
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
    this.mensajeGlobal.set('Empleado guardado correctamente');
  }
}
