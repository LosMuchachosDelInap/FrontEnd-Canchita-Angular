import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { User, UserRole, USER_ROLES } from '../../interfaces';

export type FormMode = 'create' | 'edit' | 'login' | 'register';

@Component({
  selector: 'app-usuarios-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './usuarios-form.component.html',
  styleUrls: ['./usuarios-form.component.css']
})
export class UsuariosFormComponent implements OnInit {
  @Input() mode: FormMode = 'login';
  @Input() user?: User;
  @Input() currentUserRole?: UserRole;
  @Input() loading = false;

  @Output() formSubmit = new EventEmitter<any>();
  @Output() formCancel = new EventEmitter<void>();
  @Output() modeChange = new EventEmitter<FormMode>();

  userForm!: FormGroup;
  hidePassword = true;
  availableRoles: {value: UserRole, label: string}[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initializeForm();
    this.setAvailableRoles();
  }

  get canSelectRole(): boolean {
    return this.mode === 'create' && (this.currentUserRole === 'administrador' || this.currentUserRole === 'dueno');
  }

  private initializeForm() {
    const formConfig: any = {
      email: ['', [Validators.required, Validators.email]],
    };

    if (this.mode === 'login') {
      formConfig.password = ['', [Validators.required]];
    } else {
      formConfig.nombre = ['', [Validators.required]];
      formConfig.apellido = ['', [Validators.required]];
      formConfig.edad = ['', [Validators.min(1)]];
      formConfig.dni = [''];
      formConfig.telefono = [''];
      formConfig.rol = [this.mode === 'register' ? 'cliente' : '', this.canSelectRole ? [Validators.required] : []];
      
      if (this.mode !== 'edit') {
        formConfig.password = ['', [Validators.required, Validators.minLength(6)]];
      }
    }

    this.userForm = this.fb.group(formConfig);

    // Si estamos editando, prellenar el formulario
    if (this.mode === 'edit' && this.user) {
      this.userForm.patchValue(this.user);
    }
  }

  private setAvailableRoles() {
    // Definir qué roles puede asignar cada tipo de usuario
    if (this.currentUserRole === 'dueno') {
      this.availableRoles = [
        { value: 'cliente', label: 'Cliente' },
        { value: 'empleado', label: 'Empleado' },
        { value: 'administrador', label: 'Administrador' }
      ];
    } else if (this.currentUserRole === 'administrador') {
      this.availableRoles = [
        { value: 'cliente', label: 'Cliente' },
        { value: 'empleado', label: 'Empleado' }
      ];
    } else {
      this.availableRoles = [
        { value: 'cliente', label: 'Cliente' }
      ];
    }
  }

  getSubmitButtonText(): string {
    switch (this.mode) {
      case 'login': return 'Iniciar Sesión';
      case 'register': return 'Registrarse';
      case 'create': return 'Crear Usuario';
      case 'edit': return 'Actualizar';
      default: return 'Enviar';
    }
  }

  getLoadingText(): string {
    switch (this.mode) {
      case 'login': return 'Iniciando sesión...';
      case 'register': return 'Registrando...';
      case 'create': return 'Creando usuario...';
      case 'edit': return 'Actualizando...';
      default: return 'Procesando...';
    }
  }

  switchToRegister() {
    this.modeChange.emit('register');
  }

  switchToLogin() {
    this.modeChange.emit('login');
  }

  onSubmit() {
    if (this.userForm.valid) {
      const formValue = { ...this.userForm.value };
      
      // Si estamos editando, incluir el ID
      if (this.mode === 'edit' && this.user?.id) {
        formValue.id = this.user.id;
      }

      this.formSubmit.emit(formValue);
    }
  }

  onCancel() {
    this.formCancel.emit();
  }
}
