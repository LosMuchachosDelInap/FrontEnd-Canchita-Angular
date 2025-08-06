// Interfaces para manejo de permisos granulares
export interface RolePermissions {
  canCreateEmployees: boolean;
  canEditEmployees: boolean;
  canDeleteEmployees: boolean;
  allowedRolesToAssign: string[];
  canPromoteToAdmin: boolean;
  canPromoteToOwner: boolean;
}

export interface UserPermissions {
  role: string;
  permissions: RolePermissions;
}

// Definición de roles disponibles en el sistema
export const ROLES = {
  DUENO: 'dueño',
  ADMINISTRADOR: 'administrador',
  EMPLEADO: 'empleado',
  RECEPCIONISTA: 'recepcionista',
  MANTENIMIENTO: 'mantenimiento'
} as const;

export type UserRole = typeof ROLES[keyof typeof ROLES];
