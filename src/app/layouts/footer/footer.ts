import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { UsuariosModalComponent } from '@shared/components/usuarios-modal/usuarios-modal.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './footer.html',
  styleUrls: ['./footer.css']
})
export class FooterComponent {
  
  constructor(private dialog: MatDialog) {}

  /**
   * Abrir modal de contacto usando el modal reutilizable
   */
  openContactModal(): void {
    const dialogRef = this.dialog.open(UsuariosModalComponent, {
      width: '500px',
      data: {
        mode: 'contacto',
        title: 'Hacenos una Consulta o Sugerencia'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.success) {
        console.log('✅ Consulta enviada exitosamente');
        // Aquí se puede agregar una notificación de éxito
      }
    });
  }
}
