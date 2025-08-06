export interface Cancha {
  id_cancha: number;
  nombre: string;
  descripcion?: string;
  tipo_cancha: 'futbol5' | 'futbol7' | 'futbol11' | 'basquet' | 'tenis' | 'voley';
  capacidad_jugadores: number;
  precio_por_hora: number;
  tiene_iluminacion: boolean;
  tiene_vestuarios: boolean;
  tiene_estacionamiento: boolean;
  superficie: 'cesped_natural' | 'cesped_sintetico' | 'cemento' | 'madera' | 'arcilla';
  dimensiones?: string; // ej: "40x20 metros"
  estado: 'disponible' | 'mantenimiento' | 'fuera_servicio';
  imagen_url?: string;
  fecha_creacion?: string;
  activo?: boolean;
}
