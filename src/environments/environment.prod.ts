export const environment = {
  production: true,
  apiUrl: 'https://your-domain.com/api', // URL de producción
  
  // Firebase Configuration (producción)
  firebase: {
    apiKey: 'your-production-api-key',
    authDomain: 'your-production-project.firebaseapp.com',
    projectId: 'your-production-project-id',
    storageBucket: 'your-production-project.appspot.com',
    messagingSenderId: '987654321',
    appId: 'your-production-app-id'
  },
  
  // Configuraciones de producción
  debug: false,
  logLevel: 'error',
  
  // URLs externas (producción)
  googleMapsApiKey: 'your-production-google-maps-key',
  
  // Configuraciones de email
  emailConfig: {
    supportEmail: 'support@lacanchitadelospibes.com',
    adminEmail: 'admin@lacanchitadelospibes.com'
  },
  
  // Configuraciones de la aplicación
  app: {
    name: 'La Canchita de los Pibes',
    version: '1.0.0',
    supportPhone: '+54 9 11 1234-5678'
  }
};
