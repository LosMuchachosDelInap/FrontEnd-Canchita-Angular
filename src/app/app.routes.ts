import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./features/home/home.routes').then((m) => m.homeRoutes),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.routes').then((m) => m.authRoutes),
  },
  {
    path: 'reservas',
    loadChildren: () =>
      import('./features/reservas/reservas.routes').then((m) => m.reservasRoutes),
  },
    {
    path: 'empleados',
    loadChildren: () =>
      import('./features/admin/empleados/empleados.routes').then((m) => m.empleadostRoutes),
  },
  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full',
  }
];
