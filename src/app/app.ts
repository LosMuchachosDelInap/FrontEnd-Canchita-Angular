import { Component, signal } from '@angular/core';
import { NavbarComponent } from './layouts/navbar/navbar';
import { SidenavComponent } from './layouts/sidenav/sidenav';
import { FooterComponent } from './layouts/footer/footer';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavbarComponent,
    SidenavComponent,
    FooterComponent,
    RouterOutlet
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  opened = signal(false);

  toggleSidenav() {
    this.opened.update(v => !v);
  }
}
