import { Routes } from '@angular/router';

export const homeRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home').then(m => m.Home),
  },
  {
    path: 'nosotros',
    loadComponent: () => import('./nosotros/nosotros').then(m => m.Nosotros)
  },
  {
    path: 'contacto',
    loadComponent: () => import('./contacto/contacto').then(m => m.Contacto)
  },
  {
    path: 'servicios',
    loadComponent: () => import('./servicios/servicios').then(m => m.Servicios)
  }
];