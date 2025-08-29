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
import { HttpClient } from '@angular/common/http';
import {
  CanchasFormComponent,
  CanchaFormMode,
} from '../canchas-form/canchas-form.component';
import { CanchasService } from '../../services/canchas.service';
import { CanchaAdmin } from '../../interfaces/cancha.interface';

export interface CanchasModalData {
  mode: CanchaFormMode;
  cancha?: CanchaAdmin;
  title?: string;
}

@Component({
  selector: 'app-canchas-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    CanchasFormComponent,
  ],
  templateUrl: './canchas-modal.component.html',
  styleUrls: ['./canchas-modal.component.css'],
})
export class CanchasModalComponent implements OnInit {
  @Input() mode: CanchaFormMode = 'create';
  @Input() cancha: CanchaAdmin | null = null;
  @Output() cerrar = new EventEmitter<void>();
  @Output() modeChange = new EventEmitter<CanchaFormMode>();

  loading = false;
  currentMode: CanchaFormMode;

  constructor(
    public dialogRef: MatDialogRef<CanchasModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CanchasModalData,
    private canchasService: CanchasService
  ) {
    this.currentMode = this.data.mode;
  }

  ngOnInit() {
    this.setupModal();
  }

  private setupModal() {
    // Configurar el tamaño del modal según el modo
    switch (this.data.mode) {
      case 'view':
        this.dialogRef.updateSize('600px');
        break;
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
      case 'create':
        return 'Crear Nueva Cancha';
      case 'edit':
        return `Editar Cancha: ${this.data.cancha?.nombre}`;
      case 'view':
        return `Detalles de Cancha: ${this.data.cancha?.nombre}`;
      default:
        return 'Gestión de Cancha';
    }
  }

  /**
   * Obtener el icono del modal
   */
  getModalIcon(): string {
    switch (this.currentMode) {
      case 'create':
        return 'add_circle';
      case 'edit':
        return 'edit';
      case 'view':
        return 'visibility';
      default:
        return 'sports_soccer';
    }
  }

  /**
   * Cambiar entre modos
   */
  switchMode(newMode: CanchaFormMode) {
    this.currentMode = newMode;
    this.data.mode = newMode;
    this.setupModal();
  }

  /**
   * Manejar cambio de modo desde el formulario
   */
  onModeChange(newMode: CanchaFormMode) {
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
        case 'create':
          result = await this.handleCreateCancha(formData);
          break;
        case 'edit':
          result = await this.handleEditCancha(formData);
          break;
        default:
          result = { success: false, message: 'Modo no válido' };
      }

      this.dialogRef.close({
        action: 'submit',
        data: result.success ? formData : result,
        mode: this.currentMode,
        success: result.success,
        refresh: !result.success, // Solo refresh si hay error (fallback)
      });
    } catch (error) {
      console.error('Error en el formulario:', error);
      this.loading = false;
    }
  }

  /**
   * Manejar creación de cancha
   */
  private handleCreateCancha(formData: any): Promise<any> {
    return new Promise((resolve) => {
      this.canchasService.createCancha(formData).subscribe({
        next: (response) => resolve(response),
        error: (error) =>
          resolve({
            success: false,
            message: error.message || 'Error al crear cancha',
          }),
      });
    });
  }

  /**
   * Manejar edición de cancha
   */
  private handleEditCancha(formData: any): Promise<any> {
    // Preparar datos para el backend
    const updateData = {
      ...formData,
      id_cancha: this.data.cancha?.idCancha,
      idCancha: this.data.cancha?.idCancha,
    };

    console.log('Enviando datos de actualización de cancha:', updateData);

    return new Promise((resolve) => {
      this.canchasService.updateCancha(updateData).subscribe({
        next: (response) => {
          console.log('Respuesta del servidor:', response);
          resolve(response);
        },
        error: (error) => {
          console.error('Error al actualizar cancha:', error);
          resolve({
            success: false,
            message: error.message || 'Error al actualizar cancha',
          });
        },
      });
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
