import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/sign-in',
    pathMatch: 'full'
  },
  {
    path: 'auth/sign-in',
    loadComponent: () => import('./features/auth/sign-in/sign-in.component').then(m => m.SignInComponent)
  },
  {
    path: '**',
    redirectTo: '/auth/sign-in'
  }
];
