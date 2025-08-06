
import { Routes } from '@angular/router';

export const reservasRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./reservas').then(m => m.Reservas)
  },
  {
    path: 'nueva',
    loadComponent: () => import('./nueva-reserva/nueva-reserva').then(m => m.NuevaReserva)
  },
  {
    path: 'mis-reservas',
    loadComponent: () => import('./mis-reservas/mis-reservas').then(m => m.MisReservas)
  },
  {
    path: 'detalle/:id',
    loadComponent: () => import('./detalle-reserva/detalle-reserva').then(m => m.DetalleReserva)
  },
  {
    path: 'cancelar/:id',
    loadComponent: () => import('./cancelar-reserva/cancelar-reserva').then(m => m.CancelarReserva)
  }
];