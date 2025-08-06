export interface Reserva {
  id_reserva: number;
  id_usuario: number;
  id_cancha: number;
  fecha_reserva: string; // YYYY-MM-DD
  hora_inicio: string; // HH:mm:ss
  hora_fin: string; // HH:mm:ss
  precio_total: number;
  estado: 'pendiente' | 'confirmada' | 'cancelada' | 'completada';
  metodo_pago?: 'efectivo' | 'tarjeta' | 'transferencia' | 'mercado_pago';
  comentarios?: string;
  fecha_creacion?: string;
  fecha_cancelacion?: string;
  motivo_cancelacion?: string;
  
  // Relaciones (para cuando hagas joins)
  usuario?: {
    nombre: string;
    apellido: string;
    email: string;
    telefono?: string;
  };
  cancha?: {
    nombre: string;
    tipo_cancha: string;
    precio_por_hora: number;
  };
}

export interface ReservaForm {
  id_cancha: number;
  fecha_reserva: string;
  hora_inicio: string;
  hora_fin: string;
  comentarios?: string;
}
