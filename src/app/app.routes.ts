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
  // Rutas de reservas - TODOS los usuarios autenticados pueden reservar
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
        canActivate: [AuthGuard] // TODOS los usuarios autenticados pueden reservar
      }
    ]
  },
  // Rutas de dashboard - TODOS los usuarios autenticados
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'mis-reservas',
        loadComponent: () => import('./features/dashboard/mis-reservas/mis-reservas.component').then(m => m.MisReservasComponent)
        // TODOS los usuarios autenticados pueden ver sus reservas
      },
      {
        path: '',
        redirectTo: 'mis-reservas',
        pathMatch: 'full'
      }
    ]
  },
  // Rutas de administración - Solo Dueño y Administrador
  {
    path: 'admin',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['Dueño', 'Administrador'] },
    children: [
      {
        path: 'usuarios',
        loadComponent: () => import('./features/admin/usuarios/usuarios').then(m => m.UsuariosComponent)
        // Dueño: puede crear cualquier rol incluyendo Administrador
        // Administrador: puede crear cualquier rol EXCEPTO Dueño y Administrador
      },
      {
        path: 'empleados',
        loadComponent: () => import('./features/admin/usuarios/usuarios').then(m => m.UsuariosComponent)
      },
      {
        path: 'canchas',
        loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
        // TODO: Crear componente de gestión de canchas
      },
      {
        path: 'reservas',
        loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
        // TODO: Crear componente de gestión de reservas admin
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
      {
        path: '',
        loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
        // TODO: Crear componente específico para Bar
      }
    ]
  },
  {
    path: 'estacionamiento',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['Dueño', 'Administrador', 'Estacionamiento'] },
    children: [
      {
        path: '',
        loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
        // TODO: Crear componente específico para Estacionamiento
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];
