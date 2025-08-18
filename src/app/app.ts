import { Component, signal } from '@angular/core';
import { NavbarComponent } from './layouts/navbar/navbar';
import { SidenavComponent } from './layouts/sidenav/sidenav';
import { FooterComponent } from './layouts/footer/footer';
import { UsuariosModalComponent } from './shared/components/usuarios-modal/usuarios-modal.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavbarComponent,
    SidenavComponent,
    FooterComponent,
    UsuariosModalComponent,
    RouterOutlet
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  opened = signal(false);
  mostrarModal = signal(false);
  modalTipo = signal<'sign-in' | 'sign-up' | 'editar' | 'detalle'>('sign-in');
  usuarioSeleccionado = signal<any>(null);

  toggleSidenav() {
    this.opened.update(v => !v);
  }

  abrirSignIn() {
    this.modalTipo.set('sign-in');
    this.usuarioSeleccionado.set(null);
    this.mostrarModal.set(true);
  }

  abrirSignUp() {
    this.modalTipo.set('sign-up');
    this.usuarioSeleccionado.set(null);
    this.mostrarModal.set(true);
  }

  cerrarModal() {
    this.mostrarModal.set(false);
  }
}
