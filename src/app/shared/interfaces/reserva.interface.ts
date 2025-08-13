// Interfaces para el sistema de reservas
export interface Reserva {
  id?: number;
  usuarioId: number;
  canchaId: number;
  fechaReserva: string;
  horaInicio: string;
  horaFin: string;
  duracion: number; // en horas
  precioTotal: number;
  estado: EstadoReserva;
  observaciones?: string;
  fechaCreacion?: string;
  fechaModificacion?: string;
  
  // Datos relacionados
  usuario?: {
    nombre: string;
    apellido: string;
    email: string;
  };
  cancha?: {
    nombre: string;
    tipo: string;
  };
}

export type EstadoReserva = 'pendiente' | 'confirmada' | 'cancelada' | 'completada';

export const ESTADOS_RESERVA: Record<string, EstadoReserva> = {
  PENDIENTE: 'pendiente',
  CONFIRMADA: 'confirmada',
  CANCELADA: 'cancelada',
  COMPLETADA: 'completada'
} as const;

export interface ReservaRequest {
  usuarioId: number;
  canchaId: number;
  fechaReserva: string;
  horaInicio: string;
  horaFin: string;
  observaciones?: string;
}

export interface ReservaResponse {
  success: boolean;
  message: string;
  reserva?: Reserva;
  reservas?: Reserva[];
}

// Para FullCalendar
export interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  backgroundColor?: string;
  borderColor?: string;
  extendedProps?: {
    reserva: Reserva;
  };
}
