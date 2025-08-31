export const environment = {
  production: false,
  apiUrl: 'http://localhost:8000/src/Api',
  //apiUrl: 'http://localhost/Mis_Proyectos/LaCanchitaDeLosPibes/BackEnd-Canchita/src/Api',
  
  // Firebase Configuration (si usas Firebase)
  firebase: {
    apiKey: 'your-api-key-here',
    authDomain: 'your-project.firebaseapp.com',
    projectId: 'your-project-id',
    storageBucket: 'your-project.appspot.com',
    messagingSenderId: '123456789',
    appId: 'your-app-id'
  },
  
  // Configuraciones de desarrollo
  debug: true,
  logLevel: 'debug',
  
  // URLs externas
  googleMapsApiKey: 'your-google-maps-key',
  
  // Configuraciones de email (solo para mostrar info al usuario)
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
