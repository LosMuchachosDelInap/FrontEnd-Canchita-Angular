import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../shared/services/auth.service';
import { CanchasService, CanchaDisplay } from '../../shared/services/canchas.service';

@Component({
  selector: 'app-reservas',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatGridListModule,
    MatProgressSpinnerModule
  ],
  template: `
    <div class="reservas-container">
      <div class="header">
        <h1>Reserva tu Cancha</h1>
        <p class="subtitle">Encuentra la cancha perfecta para tu partido</p>
      </div>

      <!-- Loading spinner -->
      @if (cargandoCanchas) {
        <div class="loading-container">
          <mat-progress-spinner diameter="50"></mat-progress-spinner>
          <p>Cargando canchas disponibles...</p>
        </div>
      }

      <!-- Error message -->
      @if (errorCarga) {
        <div class="error-container">
          <mat-card class="error-card">
            <mat-card-content>
              <div class="error-content">
                <mat-icon class="error-icon">error</mat-icon>
                <div>
                  <h3>Error al cargar las canchas</h3>
                  <p>{{ errorCarga }}</p>
                </div>
              </div>
              <button mat-raised-button color="primary" (click)="recargarCanchas()">
                <mat-icon>refresh</mat-icon>
                Reintentar
              </button>
            </mat-card-content>
          </mat-card>
        </div>
      }

      <!-- Grid de canchas disponibles -->
      @if (!cargandoCanchas && !errorCarga && canchasDisponibles.length > 0) {
        <div class="canchas-grid">
          @for (cancha of canchasDisponibles; track cancha.id) {
            <mat-card class="cancha-card">
              <mat-card-header>
                <mat-card-title>{{ cancha.nombre }}</mat-card-title>
                <mat-card-subtitle>{{ cancha.tipo }}</mat-card-subtitle>
              </mat-card-header>
              
              <div class="image-container">
                <img 
                  mat-card-image 
                  [src]="cancha.imagen" 
                  [alt]="cancha.nombre"
                  (error)="onImageError($event)"
                  loading="lazy">
              </div>
              
              <mat-card-content>
                <p>{{ cancha.descripcion }}</p>
                <div class="precio">
                  <strong>\${{ cancha.precio | number:'1.0-0' }}/hora</strong>
                </div>
                <div class="caracteristicas">
                  @for (caracteristica of cancha.caracteristicas; track caracteristica.nombre) {
                    <span class="caracteristica">
                      <mat-icon>{{ caracteristica.icon }}</mat-icon>
                      {{ caracteristica.nombre }}
                    </span>
                  }
                </div>
              </mat-card-content>
              
              <mat-card-actions>
                <button 
                  mat-raised-button 
                  color="primary" 
                  (click)="reservarCancha(cancha)"
                  class="btn-reservar">
                  <mat-icon>event</mat-icon>
                  Reservar
                </button>
                <button 
                  mat-button 
                  (click)="verDetalles(cancha)"
                  class="btn-detalles">
                  <mat-icon>info</mat-icon>
                  Ver detalles
                </button>
              </mat-card-actions>
            </mat-card>
          }
        </div>
      }

      <!-- Mensaje cuando no hay canchas -->
      @if (!cargandoCanchas && !errorCarga && canchasDisponibles.length === 0) {
        <div class="no-canchas">
          <mat-card class="info-card">
            <mat-card-content>
              <div class="info-content">
                <mat-icon class="info-icon">sports_soccer</mat-icon>
                <div>
                  <h3>No hay canchas disponibles</h3>
                  <p>En este momento no hay canchas disponibles para reservar</p>
                </div>
              </div>
            </mat-card-content>
          </mat-card>
        </div>
      }

      <!-- Mensaje para usuarios no autenticados -->
      @if (!isAuthenticated) {
        <div class="auth-message">
        <mat-card class="info-card">
          <mat-card-content>
            <div class="info-content">
              <mat-icon class="info-icon">info</mat-icon>
              <div>
                <h3>¿Quieres reservar una cancha?</h3>
                <p>Inicia sesión o regístrate para poder hacer reservas</p>
              </div>
            </div>
            <div class="auth-buttons">
              <button mat-raised-button color="primary" (click)="goToLogin()">
                Iniciar Sesión
              </button>
              <button mat-button color="accent" (click)="goToRegister()">
                Registrarse
              </button>
            </div>
          </mat-card-content>
        </mat-card>
        </div>
      }
    </div>
  `,
  styles: [`
    .reservas-container {
      padding: 24px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .header {
      text-align: center;
      margin-bottom: 32px;
    }

    .header h1 {
      margin: 0;
      font-size: 2.5rem;
      color: #2e7d32;
    }

    .subtitle {
      font-size: 1.2rem;
      color: #666;
      margin-top: 8px;
    }

    .canchas-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 24px;
      margin-bottom: 32px;
    }

    .cancha-card {
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .cancha-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 16px rgba(0,0,0,0.15);
    }

    .precio {
      font-size: 1.5rem;
      color: #2e7d32;
      margin: 16px 0;
      text-align: center;
    }

    .caracteristicas {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 16px;
    }

    .caracteristica {
      display: flex;
      align-items: center;
      gap: 4px;
      background: #f5f5f5;
      padding: 4px 8px;
      border-radius: 16px;
      font-size: 0.875rem;
    }

    .caracteristica mat-icon {
      font-size: 16px;
      width: 16px;
      height: 16px;
    }

    .btn-reservar {
      flex: 1;
    }

    .btn-detalles {
      margin-left: 8px;
    }

    .auth-message {
      margin-top: 48px;
    }

    .info-card {
      max-width: 600px;
      margin: 0 auto;
    }

    .info-content {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 24px;
    }

    .info-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
      color: #2196f3;
    }

    .auth-buttons {
      display: flex;
      justify-content: center;
      gap: 16px;
    }

    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 48px 16px;
      text-align: center;
    }

    .loading-container p {
      margin-top: 16px;
      color: #666;
    }

    .error-container {
      margin-top: 32px;
    }

    .error-card {
      max-width: 600px;
      margin: 0 auto;
      border: 1px solid #f44336;
    }

    .error-content {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 16px;
    }

    .error-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
      color: #f44336;
    }

    .no-canchas {
      margin-top: 48px;
    }

    .image-container {
      position: relative;
      overflow: hidden;
      background: #f5f5f5;
    }

    .image-container img {
      width: 100%;
      height: 200px;
      object-fit: cover;
      transition: opacity 0.3s ease;
    }

    .image-container img:hover {
      opacity: 0.8;
    }
  `]
})
export class ReservasComponent implements OnInit {
  private authService = inject(AuthService);
  private canchasService = inject(CanchasService);
  private router = inject(Router);

  isAuthenticated = false;
  canchasDisponibles: CanchaDisplay[] = [];
  cargandoCanchas = true;
  errorCarga: string | null = null;

  ngOnInit() {
    // Suscribirse al estado de autenticación
    this.authService.isAuthenticated$.subscribe(
      isAuth => this.isAuthenticated = isAuth
    );

    // Cargar canchas desde el backend
    this.cargarCanchas();
  }

  /**
   * Carga las canchas desde el backend
   */
  cargarCanchas() {
    this.cargandoCanchas = true;
    this.errorCarga = null;

    this.canchasService.getCanchas().subscribe({
      next: (canchas) => {
        this.canchasDisponibles = canchas;
        this.cargandoCanchas = false;
      },
      error: (error) => {
        console.error('Error al cargar canchas:', error);
        this.errorCarga = 'No se pudieron cargar las canchas. Por favor, inténtalo de nuevo.';
        this.cargandoCanchas = false;
      }
    });
  }

  /**
   * Recarga las canchas
   */
  recargarCanchas() {
    this.cargarCanchas();
  }

  /**
   * Maneja errores de carga de imágenes
   */
  onImageError(event: any) {
    console.warn('Error cargando imagen:', event.target.src);
    // Usar una imagen SVG inline como fallback
    event.target.src = `data:image/svg+xml,${encodeURIComponent(`
      <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="300" fill="#e8f5e8"/>
        <rect x="20" y="20" width="360" height="240" fill="#4caf50" stroke="#2e7d32" stroke-width="3"/>
        <circle cx="200" cy="150" r="60" fill="none" stroke="#2e7d32" stroke-width="2"/>
        <line x1="20" y1="150" x2="380" y2="150" stroke="#2e7d32" stroke-width="2"/>
        <text x="200" y="190" text-anchor="middle" fill="#2e7d32" font-size="16" font-family="Arial">Cancha de Fútbol</text>
      </svg>
    `)}`;
  }

  reservarCancha(cancha: CanchaDisplay) {
    if (this.isAuthenticated) {
      // Si está autenticado, ir a hacer la reserva
      this.router.navigate(['/reservas/nueva'], { 
        queryParams: { canchaId: cancha.id } 
      });
    } else {
      // Si no está autenticado, redirigir al login
      this.router.navigate(['/auth/sign-in'], { 
        queryParams: { 
          returnUrl: `/reservas/nueva?canchaId=${cancha.id}` 
        } 
      });
    }
  }

  verDetalles(cancha: CanchaDisplay) {
    // Mostrar detalles de la cancha (modal o página separada)
    console.log('Ver detalles de:', cancha);
  }

  goToLogin() {
    this.router.navigate(['/auth/sign-in']);
  }

  goToRegister() {
    this.router.navigate(['/auth/sign-up']);
  }
}
