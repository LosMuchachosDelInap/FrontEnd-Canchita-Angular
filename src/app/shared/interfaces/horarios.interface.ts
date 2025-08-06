// Interfaces para horarios y disponibilidad
export interface HorarioDisponible {
  fecha: string; // YYYY-MM-DD
  hora_inicio: string; // HH:mm
  hora_fin: string; // HH:mm
  disponible: boolean;
  precio: number;
}

export interface DisponibilidadCancha {
  id_cancha: number;
  fecha: string;
  horarios: HorarioDisponible[];
}

// Interfaces para estadísticas y reportes
export interface EstadisticasReservas {
  total_reservas: number;
  reservas_confirmadas: number;
  reservas_canceladas: number;
  ingresos_total: number;
  ingresos_mes: number;
  cancha_mas_reservada: {
    nombre: string;
    total_reservas: number;
  };
}

// Interface para filtros
export interface FiltroReservas {
  fecha_desde?: string;
  fecha_hasta?: string;
  estado?: string[];
  id_cancha?: number;
  id_usuario?: number;
}
