import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, map, tap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '@envs/environment';
import { 
  LoginRequest, 
  LoginResponse, 
  RegisterRequest, 
  RegisterResponse,
  UserRole,
  ROLES 
} from '@interfaces/index';

interface CurrentUser {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  rol: UserRole;
  token?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = environment.apiURL; // Usar environment en lugar de URL hardcodeada
  
  // Estado del usuario actual
  private currentUserSubject = new BehaviorSubject<CurrentUser | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  
  // Estado de autenticación
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Verificar si hay usuario guardado en localStorage al inicializar
    this.checkStoredUser();
  }

  /**
   * Método seguro para obtener item del localStorage
   */
  private getFromStorage(key: string): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(key);
    }
    return null;
  }

  /**
   * Método seguro para guardar item en localStorage
   */
  private setInStorage(key: string, value: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(key, value);
    }
  }

  /**
   * Método seguro para eliminar item del localStorage
   */
  private removeFromStorage(key: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(key);
    }
  }

  /**
   * Verificar usuario almacenado en localStorage
   */
  private checkStoredUser(): void {
    const storedUser = this.getFromStorage('currentUser');
    if (storedUser) {
      try {
        const user: CurrentUser = JSON.parse(storedUser);
        this.currentUserSubject.next(user);
        this.isAuthenticatedSubject.next(true);
      } catch (error) {
        console.error('Error parsing stored user:', error);
        this.removeFromStorage('currentUser');
      }
    }
  }

  /**
   * Iniciar sesión
   */
  login(loginData: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/loguin.php`, loginData)
      .pipe(
        tap(response => {
          if (response.success && response.user) {
            const user: CurrentUser = {
              id: response.user.id,
              nombre: response.user.nombre,
              apellido: response.user.apellido,
              email: response.user.email,
              rol: (response.user.rol?.toLowerCase() || ROLES.EMPLEADO) as UserRole,
              token: response.token
            };
            
            this.setCurrentUser(user);
          }
        })
      );
  }

  /**
   * Registrar nuevo usuario
   */
  register(registerData: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.apiUrl}/register.php`, registerData);
  }

  /**
   * Cerrar sesión
   */
  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/cerrarSesion.php`, {})
      .pipe(
        tap(() => {
          this.clearCurrentUser();
        })
      );
  }

  /**
   * Listar empleados (movido aquí desde el componente)
   */
  listarEmpleados(): Observable<any> {
    return this.http.get(`${this.apiUrl}/listarEmpleados.php`);
  }

  /**
   * Obtener usuario actual
   */
  getCurrentUser(): CurrentUser | null {
    return this.currentUserSubject.value;
  }

  /**
   * Obtener rol del usuario actual
   */
  getCurrentUserRole(): UserRole {
    const user = this.getCurrentUser();
    return user?.rol || ROLES.EMPLEADO;
  }

  /**
   * Verificar si está autenticado
   */
  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  /**
   * Verificar si el usuario tiene un rol específico
   */
  hasRole(role: UserRole): boolean {
    const currentRole = this.getCurrentUserRole();
    return currentRole === role;
  }

  /**
   * Verificar si el usuario tiene uno de los roles especificados
   */
  hasAnyRole(roles: UserRole[]): boolean {
    const currentRole = this.getCurrentUserRole();
    return roles.includes(currentRole);
  }

  /**
   * Verificar si es administrador o dueño
   */
  isAdminOrOwner(): boolean {
    return this.hasAnyRole([ROLES.ADMINISTRADOR, ROLES.DUENO]);
  }

  /**
   * Verificar si es dueño
   */
  isOwner(): boolean {
    return this.hasRole(ROLES.DUENO);
  }

  /**
   * Establecer usuario actual
   */
  private setCurrentUser(user: CurrentUser): void {
    this.setInStorage('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(true);
  }

  /**
   * Limpiar usuario actual
   */
  private clearCurrentUser(): void {
    this.removeFromStorage('currentUser');
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
  }

}
