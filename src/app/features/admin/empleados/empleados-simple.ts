import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { environment } from '@envs/environment';
import { Empleado, Rol, EmpleadosApiResponse } from '@interfaces/index';

@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './empleados.html',
  styles: ``
})
export class Empleados implements OnInit {
  empleados: Empleado[] = [];
  roles: Rol[] = [];
  loading: boolean = false;
  error: string | null = null;

  constructor(private http: HttpClient) {}

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

  editarEmpleado(empleado: Empleado) {
    console.log('Editar empleado:', empleado);
    // TODO: Implementar funcionalidad de edición
  }

  eliminarEmpleado(empleado: Empleado) {
    console.log('Eliminar empleado:', empleado);
    // TODO: Implementar funcionalidad de eliminación
  }

  formatearFecha(fecha: string): string {
    return new Date(fecha).toLocaleDateString('es-ES');
  }

  getRolClass(rol: string): string {
    switch (rol.toLowerCase()) {
      case 'admin':
      case 'administrador':
        return 'rol-admin';
      case 'empleado':
        return 'rol-empleado';
      case 'dueño':
        return 'rol-dueño';
      default:
        return 'rol-empleado';
    }
  }
}
