import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [MatSidenavModule, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './sidenav.html',
  styleUrls: ['./sidenav.css']
})
export class SidenavComponent {
  opened = false;
}
