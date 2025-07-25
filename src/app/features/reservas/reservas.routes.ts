
const reservasRoutes = [
  {
    path: '',
    loadComponent: () => import('./reservas').then(m => m.Reservas)
  }
];
export { reservasRoutes };