import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() {}

  /**
   * Obtiene la URL base de la API
   */
  get apiUrl(): string {
    return environment.apiUrl;
  }

  /**
   * Configuración de Firebase
   */
  get firebaseConfig() {
    return environment.firebase;
  }

  /**
   * Verifica si está en modo desarrollo
   */
  get isDevelopment(): boolean {
    return !environment.production;
  }

  /**
   * Verifica si está en modo producción
   */
  get isProduction(): boolean {
    return environment.production;
  }

  /**
   * Configuración de la aplicación
   */
  get appConfig() {
    return environment.app;
  }

  /**
   * Configuración de email
   */
  get emailConfig() {
    return environment.emailConfig;
  }

  /**
   * Google Maps API Key
   */
  get googleMapsApiKey(): string {
    return environment.googleMapsApiKey;
  }

  /**
   * Configuración de logging
   */
  get logLevel(): string {
    return environment.logLevel;
  }

  /**
   * Habilitar/deshabilitar debug
   */
  get debugEnabled(): boolean {
    return environment.debug;
  }

  /**
   * Obtiene endpoint completo de la API
   */
  getApiEndpoint(endpoint: string): string {
    return `${this.apiUrl}/${endpoint}.php`;
  }

  /**
   * Configuración para desarrollo
   */
  logConfig(): void {
    if (this.debugEnabled) {
      console.group('🔧 Configuración de la Aplicación');
      console.log('🌐 Entorno:', this.isProduction ? 'Producción' : 'Desarrollo');
      console.log('🔗 API URL:', this.apiUrl);
      console.log('📧 Email Soporte:', this.emailConfig.supportEmail);
      console.log('📱 Versión:', this.appConfig.version);
      console.log('🐛 Debug:', this.debugEnabled);
      console.groupEnd();
    }
  }
}
