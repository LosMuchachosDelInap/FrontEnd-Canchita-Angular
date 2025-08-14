import { Component, ViewChild } from '@angular/core';
import { NavbarComponent } from '@layouts/navbar/navbar';
import { FooterComponent } from '@layouts/footer/footer';
import { RouterOutlet, RouterModule } from '@angular/router';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { UsuariosModalComponent } from '@shared/components/usuarios-modal/usuarios-modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NavbarComponent, 
    FooterComponent, 
    RouterOutlet,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  constructor(private dialog: MatDialog) {}

  onAbrirSidenav() {
    this.sidenav.toggle();
  }

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
