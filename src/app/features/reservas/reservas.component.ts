import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-reservas',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatGridListModule
  ],
  template: `
    <div class="reservas-container">
      <div class="header">
        <h1>Reserva tu Cancha</h1>
        <p class="subtitle">Encuentra la cancha perfecta para tu partido</p>
      </div>

      <!-- Grid de canchas disponibles -->
      <div class="canchas-grid">
        @for (cancha of canchasDisponibles; track cancha.id) {
          <mat-card class="cancha-card">
            <mat-card-header>
              <mat-card-title>{{ cancha.nombre }}</mat-card-title>
              <mat-card-subtitle>{{ cancha.tipo }}</mat-card-subtitle>
            </mat-card-header>
            
            <img mat-card-image [src]="cancha.imagen" [alt]="cancha.nombre">
            
            <mat-card-content>
              <p>{{ cancha.descripcion }}</p>
              <div class="precio">
                <strong>\${{ cancha.precio }}/hora</strong>
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
  `]
})
export class ReservasComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);

  isAuthenticated = false;

  // Datos mock de canchas - después se puede conectar al backend
  canchasDisponibles = [
    {
      id: 1,
      nombre: 'Cancha 1',
      tipo: 'Fútbol 5',
      descripcion: 'Cancha de césped sintético con iluminación LED',
      precio: 2500,
      imagen: 'assets/images/cancha1.svg',
      caracteristicas: [
        { icon: 'grass', nombre: 'Césped sintético' },
        { icon: 'wb_sunny', nombre: 'Iluminación LED' },
        { icon: 'local_parking', nombre: 'Estacionamiento' },
        { icon: 'wc', nombre: 'Vestuarios' }
      ]
    },
    {
      id: 2,
      nombre: 'Cancha 2', 
      tipo: 'Fútbol 7',
      descripcion: 'Cancha de césped natural con graderías',
      precio: 3500,
      imagen: 'assets/images/cancha2.svg',
      caracteristicas: [
        { icon: 'nature', nombre: 'Césped natural' },
        { icon: 'stadium', nombre: 'Graderías' },
        { icon: 'local_parking', nombre: 'Estacionamiento' },
        { icon: 'restaurant', nombre: 'Bar' }
      ]
    },
    {
      id: 3,
      nombre: 'Cancha 3',
      tipo: 'Fútbol 11',
      descripcion: 'Cancha reglamentaria con todas las comodidades',
      precio: 5000,
      imagen: 'assets/images/cancha3.svg',
      caracteristicas: [
        { icon: 'grass', nombre: 'Césped mixto' },
        { icon: 'stadium', nombre: 'Graderías VIP' },
        { icon: 'local_parking', nombre: 'Estacionamiento' },
        { icon: 'shower', nombre: 'Duchas' }
      ]
    }
  ];

  ngOnInit() {
    // Suscribirse al estado de autenticación
    this.authService.isAuthenticated$.subscribe(
      isAuth => this.isAuthenticated = isAuth
    );
  }

  reservarCancha(cancha: any) {
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

  verDetalles(cancha: any) {
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
