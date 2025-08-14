import { Component, ViewChild } from '@angular/core';
import { NavbarComponent } from '@layouts/navbar/navbar';
import { FooterComponent } from '@layouts/footer/footer';
import { RouterOutlet, RouterModule } from '@angular/router';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

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

  onAbrirSidenav() {
    this.sidenav.toggle();
  }
}
