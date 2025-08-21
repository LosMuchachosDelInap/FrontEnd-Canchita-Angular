import { Routes } from '@angular/router';
import { AuthGuard, AdminGuard, GuestGuard, RoleGuard } from './shared/guards';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
    // Sin canActivate - acceso público
  },
  {
    path: 'auth/sign-in',
    loadComponent: () => import('./features/auth/sign-in/sign-in.component').then(m => m.SignInComponent),
    canActivate: [GuestGuard] // Solo para usuarios no autenticados
  },
  {
    path: 'auth/sign-up',
    loadComponent: () => import('./features/auth/sign-up/sign-up.component').then(m => m.SignUpComponent),
    canActivate: [GuestGuard] // Solo para usuarios no autenticados
  },
  // Ruta de reservas - acceso público, pero reservar requiere autenticación
  {
    path: 'reservas',
    children: [
      {
        path: '',
        loadComponent: () => import('./features/reservas/reservas.component').then(m => m.ReservasComponent)
        // Sin guard - acceso público para ver canchas
      },
      {
        path: 'nueva',
        loadComponent: () => import('./features/reservas/nueva-reserva.component').then(m => m.NuevaReservaComponent),
        canActivate: [AuthGuard] // Requiere autenticación para reservar
      }
    ]
  },
  // Rutas de dashboard para usuarios autenticados
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'mis-reservas',
        loadComponent: () => import('./features/dashboard/mis-reservas/mis-reservas.component').then(m => m.MisReservasComponent)
      },
      {
        path: '',
        redirectTo: 'mis-reservas',
        pathMatch: 'full'
      }
    ]
  },
  // Rutas de administración
  {
    path: 'admin',
    canActivate: [AuthGuard, AdminGuard], // Requiere autenticación y permisos de admin
    children: [
      {
        path: 'usuarios',
        loadComponent: () => import('./features/admin/usuarios/usuarios').then(m => m.UsuariosComponent),
        data: { roles: ['Dueño', 'Administrador'] } // Roles específicos permitidos
      },
      {
        path: 'empleados',
        loadComponent: () => import('./features/admin/usuarios/usuarios').then(m => m.UsuariosComponent),
        canActivate: [RoleGuard],
        data: { roles: ['Dueño', 'Administrador'] }
      },
      {
        path: '',
        redirectTo: 'usuarios',
        pathMatch: 'full'
      }
    ]
  },
  // Rutas por rol específico
  {
    path: 'bar',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['Dueño', 'Administrador', 'Bar'] },
    children: [
      // Aquí irán las rutas específicas para el personal del bar
      {
        path: '',
        loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
      }
    ]
  },
  {
    path: 'estacionamiento',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['Dueño', 'Administrador', 'Estacionamiento'] },
    children: [
      // Aquí irán las rutas específicas para estacionamiento
      {
        path: '',
        loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];
