
const authRoutes = [
  {
    path: 'login',
    loadComponent: () => import('./sign-in/sign-in').then(m => m.SignIn)
  },
  {
    path: 'register',
    loadComponent: () => import('./sign-up/sign-up').then(m => m.SignUp)
  }
];
export {authRoutes};