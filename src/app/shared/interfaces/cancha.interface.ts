// Interfaces para el sistema de canchas
export interface Cancha {
  id?: number;
  nombre: string;
  descripcion?: string;
  tipo: TipoCancha;
  capacidad: number;
  precioHora: number;
  activa: boolean;
  fechaCreacion?: string;
  fechaModificacion?: string;
}

export type TipoCancha = 'futbol5' | 'futbol7' | 'futbol11' | 'tenis' | 'paddle' | 'basquet';

export const TIPOS_CANCHA: Record<string, TipoCancha> = {
  FUTBOL5: 'futbol5',
  FUTBOL7: 'futbol7',
  FUTBOL11: 'futbol11',
  TENIS: 'tenis',
  PADDLE: 'paddle',
  BASQUET: 'basquet'
} as const;

export interface CanchaResponse {
  success: boolean;
  message: string;
  canchas?: Cancha[];
  cancha?: Cancha;
}
