import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Cancha {
  id_cancha: number;
  nombreCancha: string;
  precio: number;
  habilitado: number;
  cancelado: number;
  tipo?: string;
  descripcion?: string;
  imagen?: string;
  caracteristicas?: Array<{icon: string, nombre: string}>;
}

export interface CanchaDisplay {
  id: number;
  nombre: string;
  tipo: string;
  descripcion: string;
  precio: number;
  imagen: string;
  caracteristicas: Array<{icon: string, nombre: string}>;
}

@Injectable({
  providedIn: 'root'
})
export class CanchasService {
  private readonly API_URL = 'http://localhost/Mis_Proyectos/LaCanchitaDeLosPibes/BackEnd-Canchita/src/Api';
  
  private canchasSubject = new BehaviorSubject<CanchaDisplay[]>([]);
  public canchas$ = this.canchasSubject.asObservable();

  constructor(private http: HttpClient) {}

  /**
   * Obtiene todas las canchas desde el backend
   */
  getCanchas(): Observable<CanchaDisplay[]> {
    return this.http.get<Cancha[]>(`${this.API_URL}/canchas.php`).pipe(
      map(response => {
        const canchasFormateadas = this.formatearCanchas(response || []);
        this.canchasSubject.next(canchasFormateadas);
        return canchasFormateadas;
      })
    );
  }

  /**
   * Convierte las canchas del backend al formato que usa el frontend
   */
  private formatearCanchas(canchas: Cancha[]): CanchaDisplay[] {
    return canchas
      .filter(cancha => cancha.habilitado === 1 && cancha.cancelado === 0)
      .map(cancha => ({
        id: cancha.id_cancha,
        nombre: cancha.nombreCancha,
        tipo: this.obtenerTipoCancha(cancha.nombreCancha),
        descripcion: this.obtenerDescripcion(cancha.nombreCancha),
        precio: cancha.precio,
        imagen: this.obtenerImagen(cancha.nombreCancha),
        caracteristicas: this.obtenerCaracteristicas(cancha.nombreCancha)
      }));
  }

  /**
   * Determina el tipo de cancha basado en el nombre
   */
  private obtenerTipoCancha(nombre: string): string {
    const nombreLower = nombre.toLowerCase();
    
    if (nombreLower.includes('monumental') || nombreLower.includes('bombonera')) {
      return 'Fútbol 11';
    } else if (nombreLower.includes('fortin') || nombreLower.includes('cilindro')) {
      return 'Fútbol 7';
    } else {
      return 'Fútbol 5';
    }
  }

  /**
   * Genera descripción basada en el nombre de la cancha
   */
  private obtenerDescripcion(nombre: string): string {
    const nombreLower = nombre.toLowerCase();
    
    const descripciones: {[key: string]: string} = {
      'monumental': 'Cancha premium con césped natural y graderías VIP, perfecta para partidos importantes',
      'bombonera': 'Experiencia única con ambiente de estadio profesional y todas las comodidades',
      'fortin': 'Cancha de tamaño intermedio ideal para equipos de 7 jugadores con excelente iluminación',
      'cilindro': 'Cancha techada con césped sintético de última generación y sistema de climatización',
      'gasometro': 'Cancha clásica con césped mixto y vestuarios amplios para máximo confort',
      'palacio': 'Cancha elegante con detalles premium y servicios exclusivos para una experiencia VIP'
    };

    for (const [key, desc] of Object.entries(descripciones)) {
      if (nombreLower.includes(key)) {
        return desc;
      }
    }

    return 'Cancha de alta calidad con todas las comodidades para disfrutar del fútbol';
  }

  /**
   * Asigna imagen basada en el nombre de la cancha
   */
  private obtenerImagen(nombre: string): string {
    const nombreLower = nombre.toLowerCase();
    
    // Generar SVG específico para cada tipo de cancha
    if (nombreLower.includes('monumental')) {
      return this.generarSVGCancha('#4caf50', '#2e7d32', 'Monumental');
    } else if (nombreLower.includes('bombonera')) {
      return this.generarSVGCancha('#2196f3', '#1565c0', 'Bombonera');
    } else if (nombreLower.includes('fortin')) {
      return this.generarSVGCancha('#ff9800', '#f57400', 'Fortín');
    } else if (nombreLower.includes('cilindro')) {
      return this.generarSVGCancha('#9c27b0', '#7b1fa2', 'Cilindro');
    } else if (nombreLower.includes('gasometro')) {
      return this.generarSVGCancha('#f44336', '#d32f2f', 'Gasómetro');
    } else if (nombreLower.includes('palacio')) {
      return this.generarSVGCancha('#ffeb3b', '#f9a825', 'Palacio');
    }
    
    // Default
    return this.generarSVGCancha('#4caf50', '#2e7d32', nombre);
  }

  /**
   * Genera un SVG de cancha personalizado
   */
  private generarSVGCancha(colorPrimario: string, colorSecundario: string, titulo: string): string {
    const svg = `
      <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grassGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${colorPrimario};stop-opacity:0.8" />
            <stop offset="100%" style="stop-color:${colorSecundario};stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="400" height="300" fill="url(#grassGradient)"/>
        <rect x="20" y="20" width="360" height="260" fill="none" stroke="white" stroke-width="3"/>
        <rect x="40" y="40" width="320" height="220" fill="none" stroke="white" stroke-width="2"/>
        <circle cx="200" cy="150" r="50" fill="none" stroke="white" stroke-width="2"/>
        <line x1="20" y1="150" x2="380" y2="150" stroke="white" stroke-width="2"/>
        <rect x="20" y="120" width="30" height="60" fill="none" stroke="white" stroke-width="2"/>
        <rect x="350" y="120" width="30" height="60" fill="none" stroke="white" stroke-width="2"/>
        <text x="200" y="280" text-anchor="middle" fill="white" font-size="18" font-family="Arial, sans-serif" font-weight="bold">${titulo}</text>
      </svg>
    `;
    return `data:image/svg+xml,${encodeURIComponent(svg)}`;
  }

  /**
   * Asigna características basadas en el tipo y precio de la cancha
   */
  private obtenerCaracteristicas(nombre: string): Array<{icon: string, nombre: string}> {
    const nombreLower = nombre.toLowerCase();
    const caracteristicasBase = [
      { icon: 'local_parking', nombre: 'Estacionamiento' },
      { icon: 'wc', nombre: 'Vestuarios' }
    ];

    if (nombreLower.includes('monumental') || nombreLower.includes('bombonera')) {
      return [
        { icon: 'nature', nombre: 'Césped natural' },
        { icon: 'stadium', nombre: 'Graderías VIP' },
        { icon: 'restaurant', nombre: 'Bar exclusivo' },
        { icon: 'shower', nombre: 'Duchas premium' },
        ...caracteristicasBase
      ];
    } else if (nombreLower.includes('fortin') || nombreLower.includes('cilindro')) {
      return [
        { icon: 'grass', nombre: 'Césped sintético' },
        { icon: 'wb_sunny', nombre: 'Iluminación LED' },
        { icon: 'stadium', nombre: 'Graderías' },
        ...caracteristicasBase
      ];
    } else {
      return [
        { icon: 'grass', nombre: 'Césped sintético' },
        { icon: 'wb_sunny', nombre: 'Iluminación LED' },
        ...caracteristicasBase
      ];
    }
  }

  /**
   * Obtiene una cancha específica por ID
   */
  getCanchaById(id: number): Observable<CanchaDisplay | undefined> {
    return this.canchas$.pipe(
      map(canchas => canchas.find(cancha => cancha.id === id))
    );
  }

  /**
   * Recarga las canchas desde el servidor
   */
  recargarCanchas(): void {
    this.getCanchas().subscribe();
  }
}
