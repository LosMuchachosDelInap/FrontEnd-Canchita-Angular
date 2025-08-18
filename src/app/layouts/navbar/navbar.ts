import { Component, Output, EventEmitter } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent {
  @Output() abrirSidenav = new EventEmitter<void>();
  @Output() abrirSignIn = new EventEmitter<void>();
  @Output() abrirSignUp = new EventEmitter<void>();
}
