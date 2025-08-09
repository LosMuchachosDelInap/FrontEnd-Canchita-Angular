
import { Routes } from '@angular/router';

export const authRoutes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./sign-in/sign-in').then(m => m.SignIn)
  },
  {
    path: 'register',
    loadComponent: () => import('./sign-up/sign-up').then(m => m.SignUp)
  }
  // TODO: Descomentar cuando los componentes estén implementados
  // {
  //   path: 'forgot-password',
  //   loadComponent: () => import('./forgot-password/forgot-password').then(m => m.ForgotPassword)
  // },
  // {
  //   path: 'reset-password/:token',
  //   loadComponent: () => import('./reset-password/reset-password').then(m => m.ResetPassword)
  // },
  // {
  //   path: 'verify-email/:token',
  //   loadComponent: () => import('./verify-email/verify-email').then(m => m.VerifyEmail)
  // }
];