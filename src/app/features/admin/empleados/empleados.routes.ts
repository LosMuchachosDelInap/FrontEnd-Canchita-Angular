const empleadostRoutes = [
  {
    path: '',
    loadComponent: () => import('./empleados').then(m => m.Empleados),
  }
];
export { empleadostRoutes };
