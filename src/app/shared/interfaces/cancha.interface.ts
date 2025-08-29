export interface Cancha {
  id_cancha: number;
  nombreCancha: string;
  precio: number;
  habilitado: number;
  cancelado: number;
  tipo?: string;
  descripcion?: string;
  imagen?: string;
}

export interface CanchaAdmin {
  idCancha: number;
  nombre: string;
  precio: number;
  estado: 'Habilitada' | 'Deshabilitada' | 'Cancelada';
  tipo: string;
  descripcion: string;
  // Campos adicionales para el backend
  id_cancha?: number;
  nombreCancha?: string;
  habilitado?: number;
  cancelado?: number;
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
