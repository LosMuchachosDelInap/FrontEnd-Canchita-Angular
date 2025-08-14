import { Component, Output, EventEmitter } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { RouterLink } from '@angular/router';
import { UsuariosModalComponent } from '@shared/components/usuarios-modal/usuarios-modal.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent {
  @Output() abrirSidenav = new EventEmitter<void>();

  constructor(private dialog: MatDialog) {}

  openLoginModal() {
    const dialogRef = this.dialog.open(UsuariosModalComponent, {
      width: '450px',
      data: {
        mode: 'login'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Login exitoso:', result);
        // Aquí puedes manejar la lógica después del login
      }
    });
  }

  openRegisterModal() {
    const dialogRef = this.dialog.open(UsuariosModalComponent, {
      width: '450px',
      data: {
        mode: 'register'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Registro exitoso:', result);
        // Aquí puedes manejar la lógica después del registro
      }
    });
  }
}
