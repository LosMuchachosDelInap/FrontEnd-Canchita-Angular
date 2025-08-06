export interface Usuario {
  id_usuario: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono?: string;
  fecha_nacimiento?: string;
  direccion?: string;
  password?: string; // Solo para registro/actualización
  fecha_registro?: string;
  activo?: boolean;
  email_verificado?: boolean;
  ultimo_acceso?: string;
}
