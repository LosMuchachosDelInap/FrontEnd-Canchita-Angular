const listRoutes = [
  {
    path: '',
    loadComponent: () => import('./list').then(m => m.List),
  }
];
export { listRoutes };
