export interface Empleado {
  id_empleado: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  fecha_nacimiento?: string;
  direccion?: string;
  id_roles?: number;
  fecha_creacion?: string;
  activo?: boolean;
}
