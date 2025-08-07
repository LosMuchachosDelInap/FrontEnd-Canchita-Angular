import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@envs/environment';
import { Cancha } from '@interfaces/cancha.interface';
import { ApiResponse } from '@interfaces/api-response.interface';

@Injectable({
  providedIn: 'root'
})
export class CanchaHttpService {
  private http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/canchas`;

  // Obtener todas las canchas
  getCanchas(): Observable<ApiResponse<Cancha[]>> {
    return this.http.get<ApiResponse<Cancha[]>>(this.apiUrl);
  }

  // Obtener una cancha por ID
  getCanchaById(id: number): Observable<ApiResponse<Cancha>> {
    return this.http.get<ApiResponse<Cancha>>(`${this.apiUrl}/${id}`);
  }

  // Crear nueva cancha
  createCancha(cancha: Partial<Cancha>): Observable<ApiResponse<Cancha>> {
    return this.http.post<ApiResponse<Cancha>>(this.apiUrl, cancha);
  }

  // Actualizar cancha existente
  updateCancha(id: number, cancha: Partial<Cancha>): Observable<ApiResponse<Cancha>> {
    return this.http.put<ApiResponse<Cancha>>(`${this.apiUrl}/${id}`, cancha);
  }

  // Eliminar cancha
  deleteCancha(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/${id}`);
  }

  // Obtener canchas por tipo
  getCanchasByTipo(tipo: string): Observable<ApiResponse<Cancha[]>> {
    return this.http.get<ApiResponse<Cancha[]>>(`${this.apiUrl}?tipo=${tipo}`);
  }

  // Obtener canchas disponibles
  getCanchasDisponibles(): Observable<ApiResponse<Cancha[]>> {
    return this.http.get<ApiResponse<Cancha[]>>(`${this.apiUrl}?estado=activo`);
  }

  // Cambiar estado de una cancha
  cambiarEstadoCancha(id: number, estado: 'activo' | 'inactivo' | 'mantenimiento'): Observable<ApiResponse<Cancha>> {
    return this.http.patch<ApiResponse<Cancha>>(`${this.apiUrl}/${id}/estado`, { estado });
  }

  // Subir imagen de cancha
  uploadImagenCancha(id: number, imagen: File): Observable<ApiResponse<{ imagen_url: string }>> {
    const formData = new FormData();
    formData.append('imagen', imagen);
    
    return this.http.post<ApiResponse<{ imagen_url: string }>>(
      `${this.apiUrl}/${id}/imagen`, 
      formData
    );
  }

  // Obtener estadísticas de canchas
  getEstadisticasCanchas(): Observable<ApiResponse<{
    total: number;
    activas: number;
    inactivas: number;
    en_mantenimiento: number;
    por_tipo: Record<string, number>;
  }>> {
    return this.http.get<ApiResponse<any>>(`${this.apiUrl}/estadisticas`);
  }
}
