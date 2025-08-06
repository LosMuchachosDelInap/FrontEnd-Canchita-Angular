import { Routes } from '@angular/router';
import { ownerGuard } from '@guards/auth.guard';

export const canchasRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./canchas').then(m => m.Canchas)
  },
  {
    path: 'nueva',
    loadComponent: () => import('./nueva-cancha/nueva-cancha').then(m => m.NuevaCancha)
  },
  {
    path: 'editar/:id',
    loadComponent: () => import('./editar-cancha/editar-cancha').then(m => m.EditarCancha)
  },
  {
    path: 'detalle/:id',
    loadComponent: () => import('./detalle-cancha/detalle-cancha').then(m => m.DetalleCancha)
  },
  {
    path: 'eliminar/:id',
    canActivate: [ownerGuard], // 🛡️ Solo el dueño puede eliminar canchas
    loadComponent: () => import('./eliminar-cancha/eliminar-cancha').then(m => m.EliminarCancha)
  }
];
