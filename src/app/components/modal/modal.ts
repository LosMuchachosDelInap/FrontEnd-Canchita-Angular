import { Component, signal, ChangeDetectorRef, effect } from '@angular/core';
import { SignIn } from '@features/auth/sign-in/sign-in';
import { SignUp } from '@features/auth/sign-up/sign-up';
import { MatDialogModule } from '@angular/material/dialog';
import { NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
//import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    MatDialogModule,
    SignIn,
    SignUp,
    NgIf,
    NgSwitch,
    NgSwitchCase,
   // HttpClientModule
  ],
  templateUrl: './modal.html'
})
export class ModalComponent {
  formType = signal<'login' | 'register'>('login');
  mensajeGlobal = signal(''); // Ejemplo de mensaje global

  constructor(private cdr: ChangeDetectorRef) {
    effect(() => {
      // Se ejecuta cada vez que cambia el tipo de formulario
      this.mensajeGlobal.set(''); // Limpia el mensaje global
      // Aquí podrías inicializar otros datos si lo necesitas
      // Por ejemplo: cargar datos de usuario, resetear formularios, etc.
       console.log('Formulario cambiado a:', this.formType());
    });
  }

  setFormType(type: 'login' | 'register') {
    this.formType.set(type);
    this.cdr.detectChanges();
  }
}
