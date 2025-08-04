import { Component, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { ModalComponent } from '../modal/modal';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatDialogModule ,
  ],
  templateUrl: './toolbar.html',
  styleUrls: ['./toolbar.scss'],
})
export class Toolbar {
  @Input() drawer!: MatSidenav;

  constructor(private dialog: MatDialog) {}

  openModal(type: 'login' | 'register') {
    const dialogRef = this.dialog.open(ModalComponent); // abre el modal
    dialogRef.componentInstance.setFormType(type); // muestra el formulario correspondiente
  }
}