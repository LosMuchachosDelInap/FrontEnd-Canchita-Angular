export interface Empleado {
  id_empleado?: number;
  id_persona?: number;
  id_usuario?: number;
  id_roles?: number;
  nombre: string;
  apellido: string;
  edad: string;
  dni: string;
  telefono: string;
  email: string;
  password?: string; // solo para registro/edición
  rol: number;
}
