const homeRoutes = [
  {
    path: '',
    loadComponent: () => import('./home').then(m => m.Home),
  },
];
export { homeRoutes };