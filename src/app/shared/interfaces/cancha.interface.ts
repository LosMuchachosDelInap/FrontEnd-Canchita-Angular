export interface Cancha {
  id_cancha: number;
  nombre: string;
  descripcion?: string;
  tipo_cancha: 'futbol5' | 'futbol7' | 'futbol11' | 'basquet' | 'tenis' | 'voley' | 'paddle';
  capacidad_jugadores: number;
  precio_por_hora: number;
  tiene_iluminacion: boolean;
  tiene_vestuarios: boolean;
  tiene_estacionamiento: boolean;
  superficie: 'cesped_natural' | 'cesped_sintetico' | 'cemento' | 'parquet' | 'tierra_batida';
  dimensiones?: string; // ej: "40x20 metros"
  estado: 'activo' | 'inactivo' | 'mantenimiento';
  imagen_url?: string;
  fecha_creacion?: string;
  activo?: boolean;
  horario_apertura?: string;
  horario_cierre?: string;
}

// Interfaces para modales y acciones
export interface ModalAction {
  type: 'create' | 'edit' | 'delete' | 'view';
  cancha: Cancha | null;
}

export interface CanchaAction {
  cancha: Cancha;
  action: 'edit' | 'delete' | 'detail';
}
