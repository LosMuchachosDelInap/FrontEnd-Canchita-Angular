export const environment = {
  production: true,
  apiUrl: 'https://your-domain.com/api', // URL de producción
  
  // Firebase Configuration (producción)
  firebaseConfig: {
    apiKey: "AIzaSyBCBx0208IfmpjeHD6hL1oGd8Qp4DcH6Iw",
    authDomain: "lacanchitadelospibes.firebaseapp.com",
    projectId: "lacanchitadelospibes",
    storageBucket: "lacanchitadelospibes.firebasestorage.app",
    messagingSenderId: "196298937978",
    appId: "1:196298937978:web:2d609e7c2dafa807034dc3",
    measurementId: "G-K8PJTQLPG8"
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
