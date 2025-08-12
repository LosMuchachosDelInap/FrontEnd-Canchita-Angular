import { Component } from '@angular/core';
import { TablaComponent } from '@shared/components/tabla/tabla';
// Importa la interfaz Usuario desde shared/interfaces
import { Usuario } from '@shared/interfaces/usuario.interface'; // Asegúrate de que la ruta sea correcta

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
  imports: [TablaComponent],
  templateUrl: './usuarios.html',
  styleUrls: ['./usuarios.css']
})
export class UsuariosComponent {
  // Encabezados de la tabla (deben coincidir con las claves de Usuario)
  headers = ['idUsuario', 'apellido', 'nombre', 'email', 'edad', 'dni', 'telefono', 'rol'];

  // Datos de ejemplo (array de Usuario)
  usuarios: Usuario[] = [
    { idUsuario: 1, apellido: 'Pérez', nombre: 'Juan', email: 'juan@mail.com', edad: 30, dni: '12345678', telefono: '123456789', rol: 'admin' }
    // ...más usuarios
  ];

  // Acciones para cada fila de la tabla
  usuarioActions: UsuarioAction[] = [
    { icon: 'info', tooltip: 'Detalle', callback: (row: Usuario) => this.abrirDetalle(row) },
    { icon: 'edit', tooltip: 'Modificar', callback: (row: Usuario) => this.abrirModificar(row) },
    { icon: 'delete', tooltip: 'Eliminar', color: 'warn', callback: (row: Usuario) => this.eliminarUsuario(row.idUsuario) }
  ];

  // Método para abrir el modal de detalle
  abrirDetalle(usuario: Usuario) { /* ... */ }

  // Método para abrir el modal de modificar
  abrirModificar(usuario: Usuario) { /* ... */ }

  // Método para eliminar el usuario
  eliminarUsuario(id: number) { /* ... */ }
}
