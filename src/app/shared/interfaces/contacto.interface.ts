export interface Contacto {
  id_contacto?: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono?: string;
  asunto: string;
  mensaje: string;
  tipo_consulta: 'general' | 'reserva' | 'cancelacion' | 'reclamo' | 'sugerencia';
  estado?: 'pendiente' | 'en_proceso' | 'resuelto' | 'cerrado';
  fecha_envio?: string;
  fecha_respuesta?: string;
  respuesta?: string;
  respondido_por?: number; // id del empleado que respondió
}

export interface ContactoForm {
  nombre: string;
  apellido: string;
  email: string;
  telefono?: string;
  asunto: string;
  mensaje: string;
  tipo_consulta: string;
}
