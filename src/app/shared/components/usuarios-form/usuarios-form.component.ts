import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
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
export class UsuariosFormComponent implements OnInit, OnChanges {
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
    
    if (this.usuario) {
      this.form.patchValue(this.usuario);
    }
    
    // Verificar si el usuario logueado es dueño (id_rol = 1)
    if (this.usuarioLogueado && this.usuarioLogueado.id_rol === 1) {
      this.isOwnerRegistering = true;
      this.canSelectRole = true;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['tipo'] && !changes['tipo'].firstChange) {
      this.setupFormValidations();
    }
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
    } else if (this.tipo === 'sign-up' || this.tipo === 'editar' || this.tipo === 'detalle') {
      // Validar todos los campos para registro/edición
      this.form = this.fb.group({
        nombre: ['', Validators.required],
        apellido: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        clave: ['', [Validators.required, Validators.minLength(6)]],
        dni: ['', [Validators.required, Validators.pattern(/^\d{7,8}$/)]],
        edad: ['', [Validators.required, Validators.min(16), Validators.max(99)]],
        telefono: ['', [Validators.required, Validators.pattern(/^\d{10,11}$/)]],
        rol: [this.isOwnerRegistering ? '' : 6, this.isOwnerRegistering ? Validators.required : []]
      });
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
