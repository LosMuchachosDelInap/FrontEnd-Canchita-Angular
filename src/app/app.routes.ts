import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'auth/sign-in',
    loadComponent: () => import('./features/auth/sign-in/sign-in.component').then(m => m.SignInComponent)
  },
  {
    path: 'auth/sign-up',
    loadComponent: () => import('./features/auth/sign-up/sign-up.component').then(m => m.SignUpComponent)
  },
  {
    path: 'admin/usuarios',
    loadComponent: () => import('./features/admin/usuarios/usuarios').then(m => m.UsuariosComponent)
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];
