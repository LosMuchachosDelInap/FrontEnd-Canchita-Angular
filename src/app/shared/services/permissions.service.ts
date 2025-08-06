import { Injectable } from '@angular/core';
import { ROLES, UserRole, RolePermissions, UserPermissions } from '@interfaces/permissions.interface';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {

  private rolePermissionsMap: Record<UserRole, RolePermissions> = {
    [ROLES.DUENO]: {
      canCreateEmployees: true,
      canEditEmployees: true,
      canDeleteEmployees: true,
      allowedRolesToAssign: [
        ROLES.ADMINISTRADOR,
        ROLES.EMPLEADO,
        ROLES.RECEPCIONISTA,
        ROLES.MANTENIMIENTO
      ],
      canPromoteToAdmin: true,
      canPromoteToOwner: true
    },
    [ROLES.ADMINISTRADOR]: {
      canCreateEmployees: true,
      canEditEmployees: true,
      canDeleteEmployees: true,
      allowedRolesToAssign: [
        ROLES.EMPLEADO,
        ROLES.RECEPCIONISTA,
        ROLES.MANTENIMIENTO
      ],
      canPromoteToAdmin: false,
      canPromoteToOwner: false
    },
    [ROLES.EMPLEADO]: {
      canCreateEmployees: false,
      canEditEmployees: false,
      canDeleteEmployees: false,
      allowedRolesToAssign: [],
      canPromoteToAdmin: false,
      canPromoteToOwner: false
    },
    [ROLES.RECEPCIONISTA]: {
      canCreateEmployees: false,
      canEditEmployees: false,
      canDeleteEmployees: false,
      allowedRolesToAssign: [],
      canPromoteToAdmin: false,
      canPromoteToOwner: false
    },
    [ROLES.MANTENIMIENTO]: {
      canCreateEmployees: false,
      canEditEmployees: false,
      canDeleteEmployees: false,
      allowedRolesToAssign: [],
      canPromoteToAdmin: false,
      canPromoteToOwner: false
    }
  };

  constructor() { }

  /**
   * Obtiene los permisos para un rol específico
   */
  getPermissionsForRole(role: UserRole): RolePermissions {
    return this.rolePermissionsMap[role] || this.rolePermissionsMap[ROLES.EMPLEADO];
  }

  /**
   * Verifica si un usuario puede asignar un rol específico
   */
  canAssignRole(currentUserRole: UserRole, targetRole: UserRole): boolean {
    const permissions = this.getPermissionsForRole(currentUserRole);
    return permissions.allowedRolesToAssign.includes(targetRole);
  }

  /**
   * Verifica si un usuario puede crear empleados
   */
  canCreateEmployee(userRole: UserRole): boolean {
    return this.getPermissionsForRole(userRole).canCreateEmployees;
  }

  /**
   * Verifica si un usuario puede editar empleados
   */
  canEditEmployee(userRole: UserRole): boolean {
    return this.getPermissionsForRole(userRole).canEditEmployees;
  }

  /**
   * Verifica si un usuario puede eliminar empleados
   */
  canDeleteEmployee(userRole: UserRole): boolean {
    return this.getPermissionsForRole(userRole).canDeleteEmployees;
  }

  /**
   * Obtiene la lista de roles que puede asignar un usuario
   */
  getAssignableRoles(userRole: UserRole): UserRole[] {
    return this.getPermissionsForRole(userRole).allowedRolesToAssign as UserRole[];
  }

  /**
   * Verifica si un usuario puede promover a administrador
   */
  canPromoteToAdmin(userRole: UserRole): boolean {
    return this.getPermissionsForRole(userRole).canPromoteToAdmin;
  }

  /**
   * Verifica si un usuario puede promover a dueño
   */
  canPromoteToOwner(userRole: UserRole): boolean {
    return this.getPermissionsForRole(userRole).canPromoteToOwner;
  }

  /**
   * Obtiene todos los roles disponibles con información adicional
   */
  getAllRoles(): Array<{value: UserRole, label: string, description: string}> {
    return [
      {
        value: ROLES.DUENO,
        label: 'Dueño',
        description: 'Acceso total al sistema'
      },
      {
        value: ROLES.ADMINISTRADOR,
        label: 'Administrador',
        description: 'Gestión de empleados y operaciones'
      },
      {
        value: ROLES.EMPLEADO,
        label: 'Empleado',
        description: 'Acceso básico al sistema'
      },
      {
        value: ROLES.RECEPCIONISTA,
        label: 'Recepcionista',
        description: 'Gestión de reservas y atención al cliente'
      },
      {
        value: ROLES.MANTENIMIENTO,
        label: 'Mantenimiento',
        description: 'Gestión de instalaciones y equipos'
      }
    ];
  }

  /**
   * Filtra los roles disponibles según el rol del usuario actual
   */
  getAvailableRolesForUser(currentUserRole: UserRole): Array<{value: UserRole, label: string, description: string}> {
    const allRoles = this.getAllRoles();
    const assignableRoles = this.getAssignableRoles(currentUserRole);
    
    return allRoles.filter(role => assignableRoles.includes(role.value));
  }
}
