import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';

export type FormMode = 'login' | 'register' | 'create' | 'edit';

@Component({
  selector: 'app-usuarios-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    MatSelectModule
  ],
  templateUrl: './usuarios-form.component.html',
  styleUrls: ['./usuarios-form.component.css'],
})
export class UsuariosFormComponent implements OnInit {
  @Input() tipo: 'sign-in' | 'sign-up' | 'editar' | 'detalle' = 'sign-in';
  @Input() usuario: any = null;
  @Input() usuarioLogueado: any = null;
  @Input() loading: boolean = false;

  @Output() formSubmit = new EventEmitter<any>();
  @Output() formCancel = new EventEmitter<void>();
  @Output() modeChange = new EventEmitter<FormMode>();

  hidePassword = true;
  form: any;

  availableRoles = [
    { value: 'admin', label: 'Administrador' },
    { value: 'user', label: 'Usuario' }
  ];

  canSelectRole: boolean = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rol: ['']
    });
  }

  ngOnInit() {
    if (this.usuario) {
      this.form.patchValue(this.usuario);
    }
    if (this.usuarioLogueado && this.usuarioLogueado.rol === 'admin') {
      this.canSelectRole = true;
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.formSubmit.emit(this.form.value);
    }
  }

  onCancel() {
    this.formCancel.emit();
  }

  getLoadingText() {
    return 'Procesando...';
  }

  getSubmitButtonText() {
    return 'Aceptar';
  }

  switchToRegister() {
    this.modeChange.emit('register');
  }

  switchToLogin() {
    this.modeChange.emit('login');
  }
}
