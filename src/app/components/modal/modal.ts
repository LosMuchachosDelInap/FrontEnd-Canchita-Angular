import { Component, signal } from '@angular/core';
import { SignIn } from '../forms/sign-in/sign-in';
import { SignUp } from '../forms/sign-up/sign-up';
import { MatDialogModule } from '@angular/material/dialog';
import { NgIf, CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    MatDialogModule,
    SignIn,
    SignUp,
    NgIf,
    CommonModule
  ],
  templateUrl: './modal.html'
})
export class ModalComponent {
  formType = signal<'login' | 'register'>('login');
}
