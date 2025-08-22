import { Injectable, inject } from '@angular/core';
import { AuthService } from './auth.service';
import { UserRole } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {
  private authService = inject(AuthService);

  /**
   * Verifica si el usuario actual puede crear usuarios con el rol especificado
   */
  canCreateUserWithRole(targetRole: UserRole): boolean {
    const currentUserRole = this.authService.getCurrentUserRole();
    
    if (!currentUserRole) {
      return false;
    }

    switch (currentUserRole) {
      case 'Dueño':
        // El Dueño puede crear cualquier rol, incluyendo Administrador
        return true;
        
      case 'Administrador':
        // El Administrador puede crear cualquier rol EXCEPTO Dueño y Administrador
        return targetRole !== 'Dueño' && targetRole !== 'Administrador';
        
      default:
        // Todos los demás roles NO pueden crear usuarios
        return false;
    }
  }

  /**
   * Obtiene la lista de roles que el usuario actual puede crear
   */
  getAvailableRolesToCreate(): UserRole[] {
    const currentUserRole = this.authService.getCurrentUserRole();
    
    if (!currentUserRole) {
      return [];
    }

    switch (currentUserRole) {
      case 'Dueño':
        return ['Dueño', 'Administrador', 'Empleado', 'Cliente', 'Bar', 'Estacionamiento'];
        
      case 'Administrador':
        return ['Empleado', 'Cliente', 'Bar', 'Estacionamiento'];
        
      default:
        return [];
    }
  }

  /**
   * Verifica si el usuario actual puede acceder a la sección especificada
   */
  canAccessSection(section: string): boolean {
    const currentUserRole = this.authService.getCurrentUserRole();
    
    if (!currentUserRole) {
      return false;
    }

    switch (section) {
      case 'admin':
        return currentUserRole === 'Dueño' || currentUserRole === 'Administrador';
        
      case 'bar':
        return currentUserRole === 'Dueño' || 
               currentUserRole === 'Administrador' || 
               currentUserRole === 'Bar';
               
      case 'estacionamiento':
        return currentUserRole === 'Dueño' || 
               currentUserRole === 'Administrador' || 
               currentUserRole === 'Estacionamiento';
               
      case 'reservas':
        // TODOS los usuarios autenticados pueden reservar
        return true;
        
      case 'dashboard':
        // TODOS los usuarios autenticados pueden ver su dashboard
        return true;
        
      default:
        return false;
    }
  }

  /**
   * Verifica si el usuario actual puede reservar canchas
   */
  canReserveCancha(): boolean {
    // TODOS los usuarios autenticados pueden reservar canchas
    return this.authService.isAuthenticated();
  }

  /**
   * Verifica si el usuario actual puede ver sus reservas
   */
  canViewOwnReservations(): boolean {
    // TODOS los usuarios autenticados pueden ver sus reservas
    return this.authService.isAuthenticated();
  }

  /**
   * Verifica restricciones específicas por rol
   */
  hasRoleRestriction(currentSection: string): boolean {
    const currentUserRole = this.authService.getCurrentUserRole();
    
    if (!currentUserRole) {
      return true;
    }

    switch (currentUserRole) {
      case 'Bar':
        // El rol Bar NO puede acceder a Estacionamiento ni Admin
        return currentSection === 'estacionamiento' || currentSection === 'admin';
        
      case 'Estacionamiento':
        // El rol Estacionamiento NO puede acceder a Bar ni Admin
        return currentSection === 'bar' || currentSection === 'admin';
        
      case 'Empleado':
      case 'Cliente':
        // Empleado y Cliente NO pueden acceder a secciones específicas de roles ni Admin
        return currentSection === 'bar' || 
               currentSection === 'estacionamiento' || 
               currentSection === 'admin';
        
      case 'Dueño':
      case 'Administrador':
        // Dueño y Administrador pueden acceder a todo
        return false;
        
      default:
        return true;
    }
  }

  /**
   * Obtiene las secciones disponibles para el rol actual
   */
  getAvailableSections(): string[] {
    const currentUserRole = this.authService.getCurrentUserRole();
    
    if (!currentUserRole) {
      return [];
    }

    const baseSections = ['reservas', 'dashboard'];
    
    switch (currentUserRole) {
      case 'Dueño':
      case 'Administrador':
        return [...baseSections, 'admin', 'bar', 'estacionamiento'];
        
      case 'Bar':
        return [...baseSections, 'bar'];
        
      case 'Estacionamiento':
        return [...baseSections, 'estacionamiento'];
        
      case 'Empleado':
      case 'Cliente':
        return baseSections;
        
      default:
        return baseSections;
    }
  }
}
