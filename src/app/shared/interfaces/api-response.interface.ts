export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

// Respuestas específicas para diferentes endpoints
export interface EmpleadosApiResponse extends ApiResponse {
  empleados: import('./empleado.interface').Empleado[];
  roles: import('./rol.interface').Rol[];
}

export interface CanchasApiResponse extends ApiResponse {
  canchas: import('./cancha.interface').Cancha[];
}

export interface ReservasApiResponse extends ApiResponse {
  reservas: import('./reserva.interface').Reserva[];
  total?: number;
}

export interface UsuariosApiResponse extends ApiResponse {
  usuarios: import('./usuario.interface').Usuario[];
}

export interface ContactosApiResponse extends ApiResponse {
  contactos: import('./contacto.interface').Contacto[];
}

export interface DisponibilidadApiResponse extends ApiResponse {
  disponibilidad: import('./horarios.interface').DisponibilidadCancha[];
}

export interface EstadisticasApiResponse extends ApiResponse {
  estadisticas: import('./horarios.interface').EstadisticasReservas;
}
