import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '@envs/environment';
import { Cancha, CanchasApiResponse, ModalAction } from '@interfaces/index';
import { AuthService } from '../../../services/auth.service';
import { CanchaModalComponent } from '../../../shared/components/cancha-modal/cancha-modal';

@Component({
  selector: 'app-canchas',
  standalone: true,
  imports: [CommonModule, CanchaModalComponent],
  templateUrl: './canchas.html',
  styleUrl: './canchas.scss'
})
export class CanchasComponent implements OnInit {
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  // Signals para el estado
  canchas = signal<Cancha[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);
  
  // Modal signals
  showModal = signal(false);
  selectedAction = signal<ModalAction | null>(null);

  // Computed signals
  filteredCanchas = computed(() => {
    return this.canchas().filter(cancha => cancha.activo !== false);
  });

  // Permisos computed - versión simplificada
  canEdit = computed(() => {
    const user = this.authService.getCurrentUser();
    return user && ['admin', 'dueño'].includes(user.rol);
  });

  canDelete = computed(() => {
    const user = this.authService.getCurrentUser();
    return user && user.rol === 'dueño';
  });

  ngOnInit() {
    this.cargarCanchas();
  }

  cargarCanchas() {
    this.loading.set(true);
    this.error.set(null);

    // Usando el HttpClient directamente por ahora
    this.http.get<CanchasApiResponse>(`${environment.apiURL}/listarCanchas.php`).subscribe({
      next: (response) => {
        if (response.success) {
          this.canchas.set(response.data || []);
        } else {
          this.error.set(response.message || 'Error al cargar canchas');
        }
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error al cargar canchas:', error);
        this.error.set('Error al cargar las canchas. Por favor, intenta nuevamente.');
        this.loading.set(false);
      }
    });
  }

  // Métodos para acciones de modal
  agregarCancha() {
    this.selectedAction.set({ type: 'create', cancha: null });
    this.showModal.set(true);
  }

  editarCancha(cancha: Cancha) {
    this.selectedAction.set({ type: 'edit', cancha });
    this.showModal.set(true);
  }

  eliminarCancha(cancha: Cancha) {
    this.selectedAction.set({ type: 'delete', cancha });
    this.showModal.set(true);
  }

  verDetalle(cancha: Cancha) {
    this.selectedAction.set({ type: 'view', cancha });
    this.showModal.set(true);
  }

  cerrarModal() {
    this.showModal.set(false);
    this.selectedAction.set(null);
  }

  onModalAction(event: { action: string; data?: Cancha }) {
    switch (event.action) {
      case 'create':
        if (event.data) {
          this.canchas.update(canchas => [...canchas, event.data!]);
        }
        break;
      case 'edit':
        if (event.data) {
          this.canchas.update(canchas => 
            canchas.map(c => c.id_cancha === event.data!.id_cancha ? event.data! : c)
          );
        }
        break;
      case 'delete':
        const canchaToDelete = this.selectedAction()?.cancha;
        if (canchaToDelete) {
          this.canchas.update(canchas => 
            canchas.filter(c => c.id_cancha !== canchaToDelete.id_cancha)
          );
        }
        break;
    }
    this.cerrarModal();
  }

  // Métodos helper para el template
  getTipoCanchaLabel(tipo: string): string {
    const tipos: Record<string, string> = {
      'futbol5': 'Fútbol 5',
      'futbol7': 'Fútbol 7',
      'futbol11': 'Fútbol 11',
      'paddle': 'Paddle',
      'tenis': 'Tenis',
      'basquet': 'Básquet',
      'voley': 'Vóley'
    };
    return tipos[tipo] || tipo;
  }

  getEstadoLabel(estado: string): string {
    const estados: Record<string, string> = {
      'activo': 'Activo',
      'inactivo': 'Inactivo',
      'mantenimiento': 'En Mantenimiento'
    };
    return estados[estado] || estado;
  }

  getEstadoClass(estado: string): string {
    const classes: Record<string, string> = {
      'activo': 'badge-active',
      'inactivo': 'badge-inactive',
      'mantenimiento': 'badge-maintenance'
    };
    return `badge ${classes[estado] || ''}`;
  }
}
