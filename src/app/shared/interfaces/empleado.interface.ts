export interface Empleado {
  id_empleado?: number;
  id_persona?: number;
  id_usuario?: number;
  id_roles?: number;
  // persona
  nombre: string;
  apellido: string;
  edad: string;
  dni: string;
  telefono: string;
  // usuario
  email: string;
  clave?: string;
  rol: number;
}
