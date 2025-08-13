// Interfaces para el sistema de autenticación
export interface User {
  id?: number;
  nombre: string;
  apellido: string;
  email: string;
  password?: string;
  edad?: number;
  dni?: string;
  telefono?: string;
  rol: UserRole;
  fechaCreacion?: string;
  fechaModificacion?: string;
}

export interface Employee extends User {
  id_empleado: number;
  activo: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  user?: User;
  token?: string;
}

export interface RegisterRequest {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  edad?: number;
  dni?: string;
  telefono?: string;
  rol?: UserRole;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  user?: User;
}

export type UserRole = 'cliente' | 'empleado' | 'administrador' | 'dueno';

export const USER_ROLES: Record<string, UserRole> = {
  CLIENTE: 'cliente',
  EMPLEADO: 'empleado',
  ADMINISTRADOR: 'administrador',
  DUENO: 'dueno'
} as const;
