import { Routes } from '@angular/router';
import { adminGuard, ownerGuard } from '@guards/auth.guard';

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
    path: 'admin',
    canActivate: [adminGuard], // 🛡️ Protección para todas las rutas admin
    children: [
      {
        path: 'empleados',
        loadChildren: () =>
          import('./features/admin/empleados/empleados.routes').then((m) => m.empleadostRoutes),
      },
      {
        path: 'canchas',
        // 🛡️ Administradores y dueños pueden gestionar canchas
        loadChildren: () =>
          import('./features/admin/canchas/canchas.routes').then((m) => m.canchasRoutes),
      }
    ]
  },
  {
    path: 'unauthorized',
    loadComponent: () => 
      import('./features/shared/unauthorized/unauthorized').then(m => m.Unauthorized)
  },
  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full',
  }
];
