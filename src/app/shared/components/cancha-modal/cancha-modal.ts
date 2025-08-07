import { Component, EventEmitter, Input, Output, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '@envs/environment';
import { Cancha, ModalAction } from '@interfaces/cancha.interface';

@Component({
  selector: 'app-cancha-modal',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cancha-modal.html',
  styleUrl: './cancha-modal.scss'
})
export class CanchaModalComponent implements OnInit {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);

  // Signals de entrada
  @Input() set action(value: ModalAction) {
    this.currentAction.set(value);
    this.initializeForm();
  }
  
  @Input() set isOpen(value: boolean) {
    this.isModalOpen.set(value);
  }

  // Signals de salida
  @Output() close = new EventEmitter<void>();
  @Output() actionComplete = new EventEmitter<{ action: string; data?: Cancha }>();

  // Signals
  currentAction = signal<ModalAction>({ type: 'view', cancha: null });
  isModalOpen = signal(false);
  isLoading = signal(false);
  canchaForm = signal<FormGroup | null>(null);

  // Computed signals
  modalTitle = computed(() => {
    const action = this.currentAction();
    switch (action.type) {
      case 'create': return 'Nueva Cancha';
      case 'edit': return 'Editar Cancha';
      case 'delete': return 'Eliminar Cancha';
      case 'view': return 'Detalles de Cancha';
      default: return 'Cancha';
    }
  });

  isReadonly = computed(() => 
    this.currentAction().type === 'view' || this.currentAction().type === 'delete'
  );

  isDeleteAction = computed(() => this.currentAction().type === 'delete');

  ngOnInit() {
    this.initializeForm();
  }

  private initializeForm() {
    const action = this.currentAction();
    const cancha = action.cancha;
    
    const form = this.fb.group({
      nombre: [cancha?.nombre || '', [Validators.required, Validators.minLength(3)]],
      descripcion: [cancha?.descripcion || ''],
      tipo_cancha: [cancha?.tipo_cancha || 'futbol5', Validators.required],
      precio_por_hora: [cancha?.precio_por_hora || 0, [Validators.required, Validators.min(0)]],
      estado: [cancha?.estado || 'activo', Validators.required],
      tiene_iluminacion: [cancha?.tiene_iluminacion || false],
      tiene_vestuarios: [cancha?.tiene_vestuarios || false],
      tiene_estacionamiento: [cancha?.tiene_estacionamiento || false],
      capacidad_jugadores: [cancha?.capacidad_jugadores || 10, [Validators.required, Validators.min(2)]],
      superficie: [cancha?.superficie || 'cesped_sintetico'],
      dimensiones: [cancha?.dimensiones || ''],
      horario_apertura: [cancha?.horario_apertura || '08:00'],
      horario_cierre: [cancha?.horario_cierre || '22:00']
    });

    // Si es solo lectura, deshabilitar todos los campos
    if (this.isReadonly()) {
      form.disable();
    }

    this.canchaForm.set(form);
  }

  onSubmit() {
    const form = this.canchaForm();
    const action = this.currentAction();
    
    if (!form || form.invalid) {
      this.markFormGroupTouched(form!);
      return;
    }

    this.isLoading.set(true);
    const formData = form.value;

    switch (action.type) {
      case 'create':
        this.createCancha(formData);
        break;
      case 'edit':
        this.updateCancha(action.cancha!.id_cancha, formData);
        break;
      case 'delete':
        this.deleteCancha(action.cancha!.id_cancha);
        break;
    }
  }

  private createCancha(data: Partial<Cancha>) {
    console.log('Creando cancha:', data);
    // Simulamos la creación por ahora
    setTimeout(() => {
      const newCancha: Cancha = {
        id_cancha: Date.now(), // ID temporal
        ...data
      } as Cancha;
      
      this.actionComplete.emit({ action: 'create', data: newCancha });
      this.closeModal();
      this.isLoading.set(false);
    }, 1000);
  }

  private updateCancha(id: number, data: Partial<Cancha>) {
    console.log('Actualizando cancha:', id, data);
    // Simulamos la actualización por ahora
    setTimeout(() => {
      const updatedCancha: Cancha = {
        id_cancha: id,
        ...data
      } as Cancha;
      
      this.actionComplete.emit({ action: 'edit', data: updatedCancha });
      this.closeModal();
      this.isLoading.set(false);
    }, 1000);
  }

  private deleteCancha(id: number) {
    console.log('Eliminando cancha:', id);
    // Simulamos la eliminación por ahora
    setTimeout(() => {
      this.actionComplete.emit({ action: 'delete' });
      this.closeModal();
      this.isLoading.set(false);
    }, 1000);
  }

  closeModal() {
    this.close.emit();
  }

  onBackdropClick(event: Event) {
    if (event.target === event.currentTarget) {
      this.closeModal();
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  // Métodos helper para el template
  isFieldInvalid(fieldName: string): boolean {
    const form = this.canchaForm();
    if (!form) return false;
    
    const field = form.get(fieldName);
    return field ? field.invalid && field.touched : false;
  }

  getFieldError(fieldName: string): string {
    const form = this.canchaForm();
    if (!form) return '';
    
    const field = form.get(fieldName);
    if (!field || !field.errors) return '';

    if (field.errors['required']) return `${fieldName} es requerido`;
    if (field.errors['minlength']) return `Mínimo ${field.errors['minlength'].requiredLength} caracteres`;
    if (field.errors['min']) return `Valor mínimo: ${field.errors['min'].min}`;
    
    return 'Campo inválido';
  }

  // Opciones para selects
  tiposCanchaOptions = [
    { value: 'futbol5', label: 'Fútbol 5' },
    { value: 'futbol7', label: 'Fútbol 7' },
    { value: 'futbol11', label: 'Fútbol 11' },
    { value: 'paddle', label: 'Paddle' },
    { value: 'tenis', label: 'Tenis' },
    { value: 'basquet', label: 'Básquet' },
    { value: 'voley', label: 'Vóley' }
  ];

  estadoOptions = [
    { value: 'activo', label: 'Activo' },
    { value: 'inactivo', label: 'Inactivo' },
    { value: 'mantenimiento', label: 'En Mantenimiento' }
  ];

  superficieOptions = [
    { value: 'cesped_natural', label: 'Césped Natural' },
    { value: 'cesped_sintetico', label: 'Césped Sintético' },
    { value: 'cemento', label: 'Cemento' },
    { value: 'parquet', label: 'Parquet' },
    { value: 'tierra_batida', label: 'Tierra Batida' }
  ];

  // Métodos helper adicionales
  getTipoCanchaLabel(tipo: string): string {
    const tipoOption = this.tiposCanchaOptions.find(option => option.value === tipo);
    return tipoOption ? tipoOption.label : tipo;
  }
}
