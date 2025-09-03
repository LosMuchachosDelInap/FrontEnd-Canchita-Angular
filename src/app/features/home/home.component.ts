import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { Subscription } from 'rxjs';
import { CanchasService } from '@shared/services/canchas.service';
import { CanchaDisplay } from '@shared/interfaces/cancha.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatChipsModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  
  canchas: CanchaDisplay[] = [];
  loading = false;
  error = '';
  private subscription = new Subscription();

  constructor(private canchasService: CanchasService) {}

  ngOnInit(): void {
    this.cargarCanchas();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * Carga las canchas desde la API
   */
  cargarCanchas(): void {
    this.loading = true;
    this.error = '';

    const sub = this.canchasService.getCanchas().subscribe({
      next: (canchas) => {
        this.canchas = canchas.slice(0, 3); // Solo mostrar las primeras 3 en home
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error al cargar las canchas. Intentando de nuevo...';
        this.loading = false;
        // Reintentar después de 3 segundos
        setTimeout(() => this.cargarCanchas(), 3000);
      }
    });

    this.subscription.add(sub);
  }

  /**
   * Reintenta la carga de canchas
   */
  reintentar(): void {
    this.cargarCanchas();
  }

  /**
   * Maneja errores de carga de imágenes
   */
  onImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    target.src = 'assets/images/cancha-default.svg';
  }

  
}
