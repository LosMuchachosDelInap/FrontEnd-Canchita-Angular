import { Routes } from '@angular/router';

export const sharedRoutes: Routes = [
  {
    path: 'unauthorized',
    loadComponent: () => import('./unauthorized/unauthorized').then(m => m.Unauthorized)
  },
 /* {
    path: 'not-found',
    loadComponent: () => import('./not-found/not-found').then(m => m.NotFound)
  }*/
];
