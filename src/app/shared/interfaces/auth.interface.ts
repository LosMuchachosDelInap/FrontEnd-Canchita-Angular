// Interfaces para autenticación
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message?: string;
  user?: {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    rol?: string;
  };
  token?: string;
}

export interface RegisterRequest {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  telefono?: string;
  fecha_nacimiento?: string;
  direccion?: string;
}

export interface RegisterResponse {
  success: boolean;
  message?: string;
  user_id?: number;
}
