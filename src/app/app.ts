import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from './layouts/navbar/navbar';
import { SidenavComponent } from './layouts/sidenav/sidenav';
import { FooterComponent } from './layouts/footer/footer';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidenavService } from './shared/services/sidenav.service';
import { ConfigService } from './shared/services/config.service';

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
export class AppComponent implements OnInit {
  
  constructor(
    public sidenavService: SidenavService,
    private configService: ConfigService
  ) {}

  ngOnInit(): void {
    // Mostrar configuración en consola (solo en development)
    this.configService.logConfig();
  }
}
