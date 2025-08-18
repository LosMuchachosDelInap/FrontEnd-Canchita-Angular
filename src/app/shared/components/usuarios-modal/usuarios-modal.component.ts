import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  UsuariosFormComponent,
  FormMode,
} from '../usuarios-form/usuarios-form.component';
import { AuthService } from '../../services/auth.service';
import { User, UserRole } from '../../interfaces';

export interface UsuariosModalData {
  mode: FormMode;
  user?: User;
  title?: string;
  currentUserRole?: UserRole;
}

@Component({
  selector: 'app-usuarios-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    UsuariosFormComponent,
  ],
  templateUrl: './usuarios-modal.component.html',
  styleUrls: ['./usuarios-modal.component.css'],
})
export class UsuariosModalComponent implements OnInit {
  @Input() tipo: 'sign-in' | 'sign-up' | 'editar' | 'detalle' = 'sign-in';
  @Input() usuario: any = null;
  @Output() cerrar = new EventEmitter<void>();
  @Output() modeChange = new EventEmitter<FormMode>();

  loading = false;
  currentMode: FormMode;

  constructor(
    public dialogRef: MatDialogRef<UsuariosModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UsuariosModalData,
    private authService: AuthService
  ) {
    this.currentMode = this.data.mode;
  }

  ngOnInit() {
    this.setupModal();
  }

  /**
   * Configurar el modal según el modo
   */
  mapFormMode(mode: FormMode): 'sign-in' | 'sign-up' | 'editar' | 'detalle' {
    switch (mode) {
      case 'login':
        return 'sign-in';
      case 'register':
        return 'sign-up';
      case 'edit':
        return 'editar';
      case 'create':
        return 'detalle';
      default:
        return 'sign-in';
    }
  }

  private setupModal() {
    // Configurar el tamaño del modal según el modo
    switch (this.data.mode) {
      case 'login':
        this.dialogRef.updateSize('400px');
        break;
      case 'register':
      case 'create':
      case 'edit':
        this.dialogRef.updateSize('600px');
        break;
    }
  }

  /**
   * Obtener el título del modal
   */
  getModalTitle(): string {
    if (this.data.title) {
      return this.data.title;
    }

    switch (this.currentMode) {
      case 'login':
        return 'Iniciar Sesión';
      case 'register':
        return 'Crear Cuenta Nueva';
      case 'create':
        return 'Crear Nuevo Usuario';
      case 'edit':
        return `Editar Usuario: ${this.data.user?.nombre} ${this.data.user?.apellido}`;
      default:
        return 'Gestión de Usuario';
    }
  }

  /**
   * Obtener el icono del modal
   */
  getModalIcon(): string {
    switch (this.currentMode) {
      case 'login':
        return 'login';
      case 'register':
        return 'person_add';
      case 'create':
        return 'group_add';
      case 'edit':
        return 'edit';
      default:
        return 'person';
    }
  }

  /**
   * Obtener el mensaje de loading
   */
  getLoadingMessage(): string {
    switch (this.currentMode) {
      case 'login':
        return 'Iniciando sesión...';
      case 'register':
        return 'Creando cuenta...';
      case 'create':
        return 'Creando usuario...';
      case 'edit':
        return 'Actualizando usuario...';
      default:
        return 'Procesando...';
    }
  }

  /**
   * Verificar si debe mostrar el footer
   */
  showFooter(): boolean {
    return this.currentMode === 'login' || this.currentMode === 'register';
  }

  /**
   * Obtener el texto del footer
   */
  getFooterText(): string {
    switch (this.currentMode) {
      case 'login':
        return 'Ingresa tus credenciales para acceder al sistema';
      case 'register':
        return 'Completa todos los campos para crear tu cuenta';
      case 'create':
        return 'Solo administradores pueden crear usuarios';
      case 'edit':
        return 'Modifica los campos que desees actualizar';
      default:
        return '';
    }
  }

  /**
   * Cambiar entre modos (login/register)
   */
  switchMode(newMode: FormMode) {
    this.currentMode = newMode;
    this.data.mode = newMode;
    this.setupModal();
   // this.modeChange.emit(newMode);
  }

  /**
   * Manejar cambio de modo desde el formulario
   */
  onModeChange(newMode: FormMode) {
    this.switchMode(newMode);
  }

  /**
   * Manejar envío del formulario
   */
  async onFormSubmit(formData: any) {
    this.loading = true;

    try {
      let result;

      switch (this.currentMode) {
        case 'login':
          result = await this.handleLogin(formData);
          break;
        case 'register':
          result = await this.handleRegister(formData);
          break;
        case 'create':
          result = await this.handleCreateUser(formData);
          break;
        case 'edit':
          result = await this.handleEditUser(formData);
          break;
        default:
          result = { success: false, message: 'Modo no válido' };
      }

      this.dialogRef.close({
        action: 'submit',
        data: result,
        mode: this.currentMode,
        success: result.success,
      });
    } catch (error) {
      console.error('Error en el formulario:', error);
      this.loading = false;
    }
  }

  /**
   * Manejar login
   */
  private handleLogin(formData: any): Promise<any> {
    return new Promise((resolve) => {
      this.authService.login(formData).subscribe({
        next: (response) => resolve(response),
        error: (error) =>
          resolve({
            success: false,
            message: error.message || 'Error al iniciar sesión',
          }),
      });
    });
  }

  /**
   * Manejar registro
   */
  private handleRegister(formData: any): Promise<any> {
    return new Promise((resolve) => {
      this.authService.register(formData).subscribe({
        next: (response) => resolve(response),
        error: (error) =>
          resolve({
            success: false,
            message: error.message || 'Error al registrar usuario',
          }),
      });
    });
  }

  /**
   * Manejar creación de usuario
   */
  private handleCreateUser(formData: any): Promise<any> {
    // TODO: Implementar llamada a API para crear usuario
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: 'Usuario creado exitosamente',
          user: formData,
        });
      }, 1000);
    });
  }

  /**
   * Manejar edición de usuario
   */
  private handleEditUser(formData: any): Promise<any> {
    // TODO: Implementar llamada a API para editar usuario
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: 'Usuario actualizado exitosamente',
          user: formData,
        });
      }, 1000);
    });
  }

  /**
   * Cerrar el modal
   */
  close() {
    if (!this.loading) {
      this.dialogRef.close({
        action: 'cancel',
      });
    }
  }
}
