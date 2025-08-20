export interface Usuario {
  idUsuario: number;
  apellido: string;
  nombre: string;
  email: string;
  edad: number;
  dni: string;
  telefono: string;
  rol: string;
  // Campos adicionales para el backend
  id_empleado?: number;
  id_usuario?: number;
  id_persona?: number;
  id_rol?: number;
}

