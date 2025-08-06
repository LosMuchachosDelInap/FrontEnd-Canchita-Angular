import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '@envs/environment';
import { Empleado, Rol, EmpleadosApiResponse, UserRole } from '@interfaces/index';
import { PermissionsService } from '@services/permissions.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './empleados.html',
  styles: ``
})
export class Empleados implements OnInit {
  empleados: Empleado[] = [];
  roles: Rol[] = [];
  loading: boolean = false;
  error: string | null = null;

  constructor(
    private http: HttpClient,
    private permissionsService: PermissionsService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.cargarEmpleados();
  }

  cargarEmpleados() {
    this.loading = true;
    this.error = null;
    
    this.http.get<EmpleadosApiResponse>(`${environment.apiURL}/listarEmpleados.php`)
      .subscribe({
        next: (response) => {
          console.log('Empleados cargados:', response);
          if (response.success) {
            this.empleados = response.empleados;
            this.roles = response.roles;
          } else {
            this.error = response.message || 'Error al cargar los empleados';
          }
          this.loading = false;
        },
        error: (error) => {
          console.error('Error al cargar empleados:', error);
          this.error = 'Error de conexión al cargar los empleados';
          this.loading = false;
        }
      });
  }

  // Métodos de permisos usando el servicio de autenticación
  get currentUserRole(): UserRole {
    return this.authService.getCurrentUserRole();
  }

  get canCreateEmployees(): boolean {
    return this.permissionsService.canCreateEmployee(this.currentUserRole);
  }

  get canEditEmployees(): boolean {
    return this.permissionsService.canEditEmployee(this.currentUserRole);
  }

  get canDeleteEmployees(): boolean {
    return this.permissionsService.canDeleteEmployee(this.currentUserRole);
  }

  get availableRoles(): Array<{value: UserRole, label: string, description: string}> {
    return this.permissionsService.getAvailableRolesForUser(this.currentUserRole);
  }

  canAssignRole(targetRole: string): boolean {
    return this.permissionsService.canAssignRole(this.currentUserRole, targetRole as UserRole);
  }

  canEditEmployeeRole(empleado: Empleado): boolean {
    // No puede editar empleados con roles superiores o iguales
    if (empleado.id_roles) {
      const empleadoRole = this.getRoleNameById(empleado.id_roles);
      
      // El dueño puede editar a todos
      if (this.authService.isOwner()) {
        return true;
      }
      
      // Los admins no pueden editar a otros admins o al dueño
      if (this.authService.hasRole('administrador' as UserRole)) {
        return empleadoRole !== 'administrador' && empleadoRole !== 'dueño';
      }
    }
    
    return this.canEditEmployees;
  }

  private getRoleNameById(roleId: number): string {
    const role = this.roles.find(r => r.id_roles === roleId);
    return role ? role.rol.toLowerCase() : '';
  }

  // Métodos para gestión de empleados
  agregarEmpleado() {
    if (this.canCreateEmployees) {
      console.log('Agregar nuevo empleado');
      console.log('Roles disponibles:', this.availableRoles);
      // TODO: Navegar a formulario con roles disponibles filtrados
    }
  }

  editarEmpleado(empleado: Empleado) {
    if (this.canEditEmployeeRole(empleado)) {
      console.log('Editar empleado:', empleado);
      // TODO: Implementar edición con validación de roles
    }
  }

  eliminarEmpleado(id: number) {
    if (this.canDeleteEmployees) {
      console.log('Eliminar empleado:', id);
      // TODO: Implementar eliminación con confirmación
    }
  }

  recargar() {
    this.cargarEmpleados();
  }
}
