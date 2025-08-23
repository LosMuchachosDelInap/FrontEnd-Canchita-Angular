import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../shared/services/auth.service';
import { ReservaService, Reserva } from '../../../shared/services/reserva.service';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-mis-reservas',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatSortModule,
    MatTooltipModule
  ],
  template: `
    <div class="mis-reservas-container">
      <div class="header">
        <h1>Mis Reservas</h1>
        <p class="subtitle">Historial y gestión de tus reservas de canchas</p>
        
        <div class="header-actions">
          <button 
            mat-raised-button 
            color="primary" 
            (click)="nuevaReserva()"
            class="btn-nueva-reserva">
            <mat-icon>add</mat-icon>
            Nueva Reserva
          </button>
        </div>
      </div>

      <!-- Filtros -->
      <mat-card class="filtros-card">
        <mat-card-content>
          <div class="filtros-container">
            <mat-form-field appearance="outline">
              <mat-label>Fecha desde</mat-label>
              <input matInput [matDatepicker]="fechaDesde" [(ngModel)]="filtros.fechaDesde">
              <mat-datepicker-toggle matSuffix [for]="fechaDesde"></mat-datepicker-toggle>
              <mat-datepicker #fechaDesde></mat-datepicker>
            </mat-form-field>
            
            <mat-form-field appearance="outline">
              <mat-label>Fecha hasta</mat-label>
              <input matInput [matDatepicker]="fechaHasta" [(ngModel)]="filtros.fechaHasta">
              <mat-datepicker-toggle matSuffix [for]="fechaHasta"></mat-datepicker-toggle>
              <mat-datepicker #fechaHasta></mat-datepicker>
            </mat-form-field>
            
            <button mat-button (click)="limpiarFiltros()">
              <mat-icon>clear</mat-icon>
              Limpiar
            </button>
          </div>
        </mat-card-content>
      </mat-card>

      <!-- Tabla de reservas -->
      <mat-card class="tabla-card">
        <mat-card-content>
          @if (reservas.length === 0) {
            <div class="no-reservas">
              <mat-icon class="no-reservas-icon">event_busy</mat-icon>
              <h3>No tienes reservas</h3>
              <p>¿Listo para jugar? Haz tu primera reserva</p>
              <button mat-raised-button color="primary" (click)="nuevaReserva()">
                <mat-icon>sports_soccer</mat-icon>
                Reservar Cancha
              </button>
            </div>
          } @else {
            <table mat-table [dataSource]="reservasFiltradas" class="reservas-table">
              <!-- Columna ID -->
              <ng-container matColumnDef="id">
                <th mat-header-cell *matHeaderCellDef>#</th>
                <td mat-cell *matCellDef="let reserva">{{ reserva.id }}</td>
              </ng-container>

              <!-- Columna Fecha -->
              <ng-container matColumnDef="fecha">
                <th mat-header-cell *matHeaderCellDef>Fecha</th>
                <td mat-cell *matCellDef="let reserva">
                  <div class="fecha-info">
                    <div class="fecha">{{ reserva.fecha | date:'dd/MM/yyyy' }}</div>
                    <div class="hora">{{ reserva.hora }} ({{ reserva.duracion }}h)</div>
                  </div>
                </td>
              </ng-container>

              <!-- Columna Cancha -->
              <ng-container matColumnDef="cancha">
                <th mat-header-cell *matHeaderCellDef>Cancha</th>
                <td mat-cell *matCellDef="let reserva">
                  <div class="cancha-info">
                    <div class="nombre">{{ reserva.cancha.nombre }}</div>
                    <div class="tipo">{{ reserva.cancha.tipo }}</div>
                  </div>
                </td>
              </ng-container>

              <!-- Columna Estado -->
              <ng-container matColumnDef="estado">
                <th mat-header-cell *matHeaderCellDef>Estado</th>
                <td mat-cell *matCellDef="let reserva">
                  <mat-chip-set>
                    <mat-chip [color]="getEstadoColor(reserva.estado)">
                      {{ getEstadoLabel(reserva.estado) }}
                    </mat-chip>
                  </mat-chip-set>
                </td>
              </ng-container>

              <!-- Columna Total -->
              <ng-container matColumnDef="total">
                <th mat-header-cell *matHeaderCellDef>Total</th>
                <td mat-cell *matCellDef="let reserva">
                  <strong>\${{ reserva.total }}</strong>
                </td>
              </ng-container>

              <!-- Columna Acciones -->
              <ng-container matColumnDef="acciones">
                <th mat-header-cell *matHeaderCellDef>Acciones</th>
                <td mat-cell *matCellDef="let reserva">
                  <div class="acciones">
                    <button mat-icon-button 
                      (click)="verDetalle(reserva)"
                      matTooltip="Ver detalle">
                      <mat-icon>visibility</mat-icon>
                    </button>
                    
                    @if (puedeModificar(reserva)) {
                      <button mat-icon-button 
                        (click)="modificarReserva(reserva)"
                        matTooltip="Modificar"
                        color="primary">
                        <mat-icon>edit</mat-icon>
                      </button>
                    }
                    
                    @if (puedeCancelar(reserva)) {
                      <button mat-icon-button 
                        (click)="cancelarReserva(reserva)"
                        matTooltip="Cancelar"
                        color="warn">
                        <mat-icon>cancel</mat-icon>
                      </button>
                    }
                  </div>
                </td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
            </table>

            <mat-paginator 
              [pageSizeOptions]="[5, 10, 20]" 
              showFirstLastButtons>
            </mat-paginator>
          }
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .mis-reservas-container {
      padding: 24px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 24px;
    }

    .header h1 {
      margin: 0;
      color: #2e7d32;
      font-size: 2.2rem;
    }

    .subtitle {
      color: #666;
      margin: 8px 0;
    }

    .filtros-card {
      margin-bottom: 24px;
    }

    .filtros-container {
      display: flex;
      gap: 16px;
      align-items: center;
      flex-wrap: wrap;
    }

    .filtros-container mat-form-field {
      min-width: 200px;
    }

    .tabla-card {
      overflow-x: auto;
    }

    .no-reservas {
      text-align: center;
      padding: 48px 24px;
      color: #666;
    }

    .no-reservas-icon {
      font-size: 64px;
      width: 64px;
      height: 64px;
      color: #ccc;
      margin-bottom: 16px;
    }

    .reservas-table {
      width: 100%;
    }

    .fecha-info {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .fecha {
      font-weight: 500;
    }

    .hora {
      font-size: 0.875rem;
      color: #666;
    }

    .cancha-info {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .nombre {
      font-weight: 500;
    }

    .tipo {
      font-size: 0.875rem;
      color: #666;
    }

    .acciones {
      display: flex;
      gap: 8px;
    }

    .btn-nueva-reserva {
      height: 48px;
    }

    /* Responsive */
    @media (max-width: 768px) {
      .header {
        flex-direction: column;
        gap: 16px;
      }

      .filtros-container {
        flex-direction: column;
        align-items: stretch;
      }

      .filtros-container mat-form-field {
        min-width: auto;
      }
    }
  `]
})
export class MisReservasComponent implements OnInit, OnDestroy {
  private authService = inject(AuthService);
  private reservaService = inject(ReservaService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private destroy$ = new Subject<void>();

  displayedColumns: string[] = ['fecha', 'cancha', 'estado', 'total', 'acciones'];
  cargando = false;
  
  filtros = {
    fechaDesde: null as Date | null,
    fechaHasta: null as Date | null
  };

  reservas: Reserva[] = [];
  reservasFiltradas: Reserva[] = [];

  ngOnInit() {
    this.cargarReservas();
    
    // Suscribirse a cambios en las reservas del servicio
    this.reservaService.reservas$
      .pipe(takeUntil(this.destroy$))
      .subscribe(reservas => {
        this.reservas = reservas;
        this.aplicarFiltros();
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  cargarReservas() {
    try {
      this.cargando = true;
      // El servicio maneja la carga y actualiza el observable automáticamente
      this.reservaService.cargarMisReservas();
    } catch (error) {
      console.error('Error al cargar reservas:', error);
      this.snackBar.open('Error al cargar las reservas', 'Cerrar', {
        duration: 3000
      });
    } finally {
      this.cargando = false;
    }
  }

  aplicarFiltros() {
    this.reservasFiltradas = this.reservas.filter(reserva => {
      if (this.filtros.fechaDesde && new Date(reserva.fecha) < this.filtros.fechaDesde) {
        return false;
      }
      if (this.filtros.fechaHasta && new Date(reserva.fecha) > this.filtros.fechaHasta) {
        return false;
      }
      return true;
    });
  }

  limpiarFiltros() {
    this.filtros.fechaDesde = null;
    this.filtros.fechaHasta = null;
    this.aplicarFiltros();
  }


  getEstadoColor(estado: string): 'primary' | 'accent' | 'warn' | undefined {
    switch (estado) {
      case 'confirmada': return 'primary';
      case 'completada': return 'accent';
      case 'cancelada': return 'warn';
      case 'pendiente': return undefined;
      default: return undefined;
    }
  }

  getEstadoLabel(estado: string): string {
    switch (estado) {
      case 'confirmada': return 'Confirmada';
      case 'completada': return 'Completada';
      case 'cancelada': return 'Cancelada';
      case 'pendiente': return 'Pendiente';
      default: return estado;
    }
  }

  puedeModificar(reserva: Reserva): boolean {
    return reserva.estado === 'pendiente' || reserva.estado === 'confirmada';
  }

  puedeCancelar(reserva: Reserva): boolean {
    return reserva.estado === 'pendiente' || reserva.estado === 'confirmada';
  }

  nuevaReserva() {
    this.router.navigate(['/reservas/nueva-reserva']);
  }

  verDetalle(reserva: Reserva) {
    console.log('Ver detalle de reserva:', reserva);
    // TODO: Implementar modal o navegación a detalle
  }

  modificarReserva(reserva: Reserva) {
    console.log('Modificar reserva:', reserva);
    // TODO: Implementar lógica de modificación
  }

  async cancelarReserva(reserva: Reserva) {
    if (confirm('¿Estás seguro de que deseas cancelar esta reserva?')) {
      try {
        await this.reservaService.cancelarReserva(reserva.id!).toPromise();
        this.snackBar.open('Reserva cancelada exitosamente', 'Cerrar', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
        // Recargar reservas
        this.reservaService.cargarMisReservas();
      } catch (error) {
        console.error('Error al cancelar reserva:', error);
        this.snackBar.open('Error al cancelar la reserva. Intenta de nuevo.', 'Cerrar', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    }
  }
}
