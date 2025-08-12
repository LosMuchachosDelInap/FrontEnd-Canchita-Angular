import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

/**
 * Componente de tabla reutilizable.
 * Recibe encabezados, datos y acciones por @Input().
 */
@Component({
  selector: 'app-tabla',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './tabla.html',
  styleUrls: ['./tabla.css']
})
export class TablaComponent {
  /**
   * Encabezados de la tabla (deben coincidir con las claves de los objetos de data).
   * Ejemplo: ['idUsuario', 'apellido', ...]
   */
  @Input() headers: string[] = [];

  /**
   * Datos a mostrar en la tabla (array de objetos).
   * Ejemplo: [{ idUsuario: 1, apellido: 'Pérez', ... }, ...]
   */
  @Input() data: any[] = [];

  /**
   * Acciones para cada fila (array de objetos con icono, tooltip y callback).
   * Ejemplo: [{ icon: 'edit', tooltip: 'Editar', callback: (row) => ... }]
   */
  @Input() actions: { icon: string, tooltip: string, callback: (row: any) => void, color?: string }[] = [];
}
