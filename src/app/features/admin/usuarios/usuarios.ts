import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TablaComponent } from '@shared/components/tabla/tabla';
import { UsuariosModalComponent } from '@shared/components/usuarios-modal/usuarios-modal.component';
import { Usuario } from '@shared/interfaces/usuario.interface';
import { UsersService } from '@shared/services/users.service';
import { AuthService } from '@shared/services/auth.service';

/**
 * Interfaz para las acciones de la tabla de usuarios.
 * Cada acción tiene un icono, tooltip, color y una función callback.
 */
interface UsuarioAction {
  icon: string;
  tooltip: string;
  color?: string;
  callback: (row: Usuario) => void;
}

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [
    CommonModule, 
    TablaComponent, 
    MatButtonModule, 
    MatIconModule, 
    MatProgressSpinnerModule,
    MatTooltipModule
  ],
  templateUrl: './usuarios.html',
  styleUrls: ['./usuarios.css']
})
export class UsuariosComponent implements OnInit {
  private dialog = inject(MatDialog);
  private usersService = inject(UsersService);
  private authService = inject(AuthService);
  private snackBar = inject(MatSnackBar);

  // Encabezados de la tabla (deben coincidir con las claves de Usuario)
  headers = ['nombre', 'apellido', 'email', 'dni', 'telefono', 'edad', 'rol'];

  // Datos de usuarios cargados desde el backend
  usuarios: Usuario[] = [];
  isLoading = true;

  // Acciones para cada fila de la tabla
  usuarioActions: UsuarioAction[] = [
    { icon: 'visibility', tooltip: 'Ver detalle', color: 'primary', callback: (row: Usuario) => this.abrirDetalle(row) },
    { icon: 'edit', tooltip: 'Modificar', color: 'accent', callback: (row: Usuario) => this.abrirModificar(row) },
    { icon: 'delete', tooltip: 'Eliminar', color: 'warn', callback: (row: Usuario) => this.eliminarUsuario(row) }
  ];

  // Mapeo de roles
  private roleMap: { [key: string]: number } = {
    'Dueño': 1,
    'Administrador': 2,
    'Bar': 3,
    'Alquiler': 4,
    'Estacionamiento': 5,
    'Cliente': 6
  };

  ngOnInit() {
    this.cargarUsuarios();
  }

  /**
   * Mapea el nombre del rol al ID correspondiente
   */
  private mapRoleNameToId(roleName: string): number {
    return this.roleMap[roleName] || 6; // Cliente por defecto
  }

  /**
   * Actualiza un usuario específico en el array local sin hacer petición al servidor
   */
  private actualizarUsuarioLocal(usuarioOriginal: Usuario, datosActualizados: any) {
    const index = this.usuarios.findIndex(u => u.idUsuario === usuarioOriginal.idUsuario);
    if (index !== -1) {
      // Actualizar solo los campos que han cambiado
      this.usuarios[index] = {
        ...this.usuarios[index],
        nombre: datosActualizados.nombre || usuarioOriginal.nombre,
        apellido: datosActualizados.apellido || usuarioOriginal.apellido,
        email: datosActualizados.email || datosActualizados.usuario || usuarioOriginal.email,
        dni: datosActualizados.dni || usuarioOriginal.dni,
        telefono: datosActualizados.telefono || usuarioOriginal.telefono,
        edad: datosActualizados.edad || usuarioOriginal.edad,
        rol: this.mapIdToRoleName(datosActualizados.rol) || usuarioOriginal.rol
      };
      console.log('Usuario actualizado localmente:', this.usuarios[index]);
    }
  }

  /**
   * Mapea el ID del rol al nombre correspondiente (inverso de mapRoleNameToId)
   */
  private mapIdToRoleName(roleId: number): string {
    const roleEntries = Object.entries(this.roleMap);
    const found = roleEntries.find(([_, id]) => id === roleId);
    return found ? found[0] : 'Cliente';
  }

  /**
   * Carga la lista de usuarios desde el backend
   */
  cargarUsuarios(forceRefresh = false) {
    console.log('Cargando usuarios...', forceRefresh ? '(forzar actualización)' : '(usar cache si disponible)');
    this.isLoading = true;
    this.usersService.getUsers(forceRefresh).subscribe({
      next: (response: any) => {
        console.log('Respuesta de usuarios:', response);
        if (response.success && (response.users || response.empleados)) {
          const userData = response.users || response.empleados;
          this.usuarios = userData.map((user: any) => ({
            idUsuario: user.id_empleado || user.id || 0,
            nombre: user.nombre || '',
            apellido: user.apellido || '',
            email: user.email || '',
            dni: user.dni || '',
            telefono: user.telefono || '',
            edad: user.edad || 0,
            rol: user.rol || user.nombre_rol || 'Cliente',
            // Campos adicionales para el backend
            id_empleado: user.id_empleado,
            id_usuario: user.id_usuario,
            id_persona: user.id_persona,
            id_rol: user.id_rol
          }));
          console.log('Usuarios cargados:', this.usuarios.length, response.message?.includes('cache') ? '(desde cache)' : '(desde servidor)');
        } else {
          this.mostrarError('No se pudieron cargar los usuarios');
        }
      },
      error: (error) => {
        console.error('Error al cargar usuarios:', error);
        this.mostrarError('Error al conectar con el servidor');
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  /**
   * Abre el modal para ver detalles del usuario
   */
  abrirDetalle(usuario: Usuario) {
    // Crear copia del usuario manteniendo la estructura correcta
    const userForModal: Usuario = {
      ...usuario
    };

    const modalData = {
      mode: 'view' as const,
      user: userForModal,
      currentUser: this.authService.getCurrentUser(),
      // Pasar el ID del rol por separado para referencia
      rolId: this.mapRoleNameToId(usuario.rol)
    };

    const dialogRef = this.dialog.open(UsuariosModalComponent, {
      width: '600px',
      data: modalData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.refresh) {
        this.cargarUsuarios();
      }
    });
  }

  /**
   * Abre el modal para modificar usuario
   */
  abrirModificar(usuario: Usuario) {
    // Crear copia del usuario manteniendo la estructura correcta
    const userForModal: Usuario = {
      ...usuario,
      // Mantener rol como string para compatibilidad con interfaz Usuario
      rol: usuario.rol
    };

    // Agregar propiedades adicionales para el formulario sin conflictos
    const modalData = {
      mode: 'edit' as const,
      user: userForModal,
      currentUser: this.authService.getCurrentUser(),
      // Pasar el ID del rol por separado para el formulario
      rolId: this.mapRoleNameToId(usuario.rol)
    };

    const dialogRef = this.dialog.open(UsuariosModalComponent, {
      width: '600px',
      data: modalData
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Modal cerrado con resultado:', result);
      if (result?.success && result?.data) {
        console.log('✅ Actualización exitosa - usando cache optimizado');
        this.actualizarUsuarioLocal(usuario, result.data); // Usar usuario original, no userForModal
        this.mostrarExito('Usuario modificado exitosamente');
      } else if (result?.refresh) {
        console.log('⚠️ Actualizando desde servidor por error');
        this.cargarUsuarios(true); // Forzar refresh del servidor
        this.mostrarExito('Usuario modificado exitosamente');
      }
    });
  }

  /**
   * Elimina un usuario con confirmación
   */
  eliminarUsuario(usuario: Usuario) {
    const confirmacion = confirm(`¿Estás seguro de eliminar al usuario ${usuario.nombre} ${usuario.apellido}?`);
    
    if (confirmacion) {
      this.usersService.deleteUser(usuario.idUsuario).subscribe({
        next: (response) => {
          if (response.success) {
            this.cargarUsuarios();
            this.mostrarExito('Usuario eliminado exitosamente');
          } else {
            this.mostrarError(response.message || 'Error al eliminar usuario');
          }
        },
        error: (error) => {
          console.error('Error al eliminar usuario:', error);
          this.mostrarError('Error al eliminar usuario');
        }
      });
    }
  }

  /**
   * Abre el modal para crear nuevo usuario
   */
  crearNuevoUsuario() {
    const dialogRef = this.dialog.open(UsuariosModalComponent, {
      width: '600px',
      data: {
        mode: 'create',
        currentUser: this.authService.getCurrentUser()
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.refresh) {
        this.cargarUsuarios();
        this.mostrarExito('Usuario creado exitosamente');
      }
    });
  }

  /**
   * Muestra mensaje de éxito
   */
  private mostrarExito(mensaje: string) {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 3000,
      panelClass: ['success-snackbar']
    });
  }

  /**
   * Muestra mensaje de error
   */
  private mostrarError(mensaje: string) {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 5000,
      panelClass: ['error-snackbar']
    });
  }
}
