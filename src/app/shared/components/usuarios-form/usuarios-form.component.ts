import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';

export type FormMode = 'login' | 'register' | 'create' | 'edit' | 'view';

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
export class UsuariosFormComponent implements OnInit, OnChanges {
  @Input() tipo: 'sign-in' | 'sign-up' | 'editar' | 'detalle' | 'crear' = 'sign-in';
  @Input() usuario: any = null;
  @Input() usuarioLogueado: any = null;
  @Input() loading: boolean = false;

  @Output() formSubmit = new EventEmitter<any>();
  @Output() formCancel = new EventEmitter<void>();
  @Output() modeChange = new EventEmitter<FormMode>();

  hidePassword = true;
  form: any;

  availableRoles = [
    { value: 1, label: 'Dueño' },
    { value: 2, label: 'Administrador' },
    { value: 3, label: 'Bar' },
    { value: 4, label: 'Alquiler' },
    { value: 5, label: 'Estacionamiento' },
    { value: 6, label: 'Cliente' }
  ];

  canSelectRole: boolean = false;
  isOwnerRegistering: boolean = false;

  constructor(private fb: FormBuilder) {
    // Inicializar el formulario con todos los campos
    this.form = this.fb.group({
      nombre: [''],
      apellido: [''],
      email: [''],
      clave: [''],
      dni: [''],
      edad: [''],
      telefono: [''],
      rol: [6] // Cliente por defecto
    });
  }

  ngOnInit() {
    this.setupFormValidations();
    
    // Verificar si el usuario logueado es dueño (id_rol = 1)
    if (this.usuarioLogueado && this.usuarioLogueado.id_rol === 1) {
      this.isOwnerRegistering = true;
      this.canSelectRole = true;
    }

    // Cargar datos del usuario después de configurar las validaciones
    if (this.usuario) {
      this.form.patchValue(this.usuario);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['tipo'] && !changes['tipo'].firstChange) {
      this.setupFormValidations();
    }
  }

  /**
   * Determina si debe mostrar el campo de rol
   */
  shouldShowRoleField(): boolean {
    // Modos de administración: siempre mostrar
    if (this.tipo === 'detalle' || this.tipo === 'editar' || this.tipo === 'crear') {
      return true;
    }
    
    // Modo registro: solo si es dueño
    if (this.tipo === 'sign-up') {
      return this.isOwnerRegistering && this.canSelectRole;
    }
    
    return false;
  }

  /**
   * Determina si el campo de rol debe ser de solo lectura
   */
  isRoleReadOnly(): boolean {
    // En modo detalle (view), el rol es solo lectura
    return this.tipo === 'detalle';
  }

  /**
   * Determina si todos los campos deben estar deshabilitados (solo lectura)
   */
  isReadOnlyMode(): boolean {
    return this.tipo === 'detalle';
  }

  /**
   * Obtiene el texto del rol basado en su ID
   */
  getRoleText(roleId: number | string): string {
    const role = this.availableRoles.find(r => r.value == roleId);
    return role ? role.label : 'Cliente';
  }

  private setupFormValidations() {
    // Configurar validaciones según el tipo
    if (this.tipo === 'sign-in') {
      // Solo validar email y password para login
      this.form = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        clave: ['', Validators.required],
        nombre: [''],
        apellido: [''],
        dni: [''],
        edad: [''],
        telefono: [''],
        rol: [6]
      });
    } else if (this.tipo === 'sign-up' || this.tipo === 'editar' || this.tipo === 'detalle' || this.tipo === 'crear') {
      // Determinar si el rol es requerido
      const roleRequired = this.shouldShowRoleField() && !this.isReadOnlyMode();
      const roleValidators = roleRequired ? [Validators.required] : [];
      const defaultRoleValue = this.shouldShowRoleField() ? (this.usuario?.rol || '') : 6;
      
      // En modo solo lectura, no aplicar validaciones
      const isReadOnly = this.isReadOnlyMode();
      
      // Validaciones para contraseña
      const passwordValidators = isReadOnly ? [] : 
        (this.tipo === 'editar' ? [Validators.minLength(6)] : [Validators.required, Validators.minLength(6)]);
      
      // Validaciones generales (solo si no es modo de solo lectura)
      const requiredValidator = isReadOnly ? [] : [Validators.required];
      const emailValidators = isReadOnly ? [] : [Validators.required, Validators.email];
      const dniValidators = isReadOnly ? [] : [Validators.required, Validators.pattern(/^\d{7,8}$/)];
      const edadValidators = isReadOnly ? [] : [Validators.required, Validators.min(16), Validators.max(99)];
      const telefonoValidators = isReadOnly ? [] : [Validators.required, Validators.pattern(/^\d{10,11}$/)];
      
      // Validar todos los campos para registro/edición
      this.form = this.fb.group({
        nombre: ['', requiredValidator],
        apellido: ['', requiredValidator],
        email: ['', emailValidators],
        clave: ['', passwordValidators],
        dni: ['', dniValidators],
        edad: ['', edadValidators],
        telefono: ['', telefonoValidators],
        rol: [defaultRoleValue, roleValidators]
      });

      // NO deshabilitar el formulario, solo hacer los campos readonly en el HTML
    }
  }

  onSubmit() {
    // Prevenir envío en modo de solo lectura
    if (this.isReadOnlyMode()) {
      return;
    }

    if (this.form.valid) {
      this.formSubmit.emit(this.form.value);
    }
  }

  onCancel() {
    this.formCancel.emit();
  }

  getLoadingText() {
    switch (this.tipo) {
      case 'sign-in':
        return 'Iniciando sesión...';
      case 'sign-up':
        return 'Registrando...';
      case 'crear':
        return 'Creando usuario...';
      case 'editar':
        return 'Guardando cambios...';
      default:
        return 'Procesando...';
    }
  }

  getSubmitButtonText() {
    switch (this.tipo) {
      case 'sign-in':
        return 'Iniciar Sesión';
      case 'sign-up':
        return 'Registrarse';
      case 'crear':
        return 'Crear Usuario';
      case 'editar':
        return 'Guardar Cambios';
      case 'detalle':
        return 'Cerrar'; // No debería mostrarse
      default:
        return 'Aceptar';
    }
  }

  switchToRegister() {
    this.modeChange.emit('register');
  }

  switchToLogin() {
    this.modeChange.emit('login');
  }
}
