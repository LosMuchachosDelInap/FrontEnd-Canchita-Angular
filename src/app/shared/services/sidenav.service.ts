import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  // Signal para el estado de apertura del sidenav
  isOpen = signal(false);

  // Métodos para controlar el sidenav
  open() {
    this.isOpen.set(true);
  }

  close() {
    this.isOpen.set(false);
  }

  toggle() {
    this.isOpen.update(current => !current);
  }
}
