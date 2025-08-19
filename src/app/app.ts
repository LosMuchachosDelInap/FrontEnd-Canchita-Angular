import { Component } from '@angular/core';
import { NavbarComponent } from './layouts/navbar/navbar';
import { SidenavComponent } from './layouts/sidenav/sidenav';
import { FooterComponent } from './layouts/footer/footer';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidenavService } from './shared/services/sidenav.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavbarComponent,
    SidenavComponent,
    FooterComponent,
    RouterOutlet,
    MatSidenavModule
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  constructor(public sidenavService: SidenavService) {}
}
