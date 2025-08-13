import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { 
  User, 
  LoginRequest, 
  LoginResponse, 
  RegisterRequest, 
  RegisterResponse,
  UserRole 
} from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/src/Api';
  
  // Estado del usuario actual
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  
  // Estado de autenticación
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) {
    // Verificar si hay usuario guardado en localStorage
    this.checkStoredUser();
  }

  /**
   * Iniciar sesión
   */
  login(loginData: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/loguin.php`, loginData)
      .pipe(
        tap(response => {
          if (response.success && response.user) {
            this.setCurrentUser(response.user);
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
   * Obtener usuario actual
   */
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  /**
   * Obtener rol del usuario actual
   */
  getCurrentUserRole(): UserRole | null {
    const user = this.getCurrentUser();
    return user?.rol || null;
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
    return currentRole ? roles.includes(currentRole) : false;
  }

  /**
   * Verificar si es administrador o dueño
   */
  isAdminOrOwner(): boolean {
    return this.hasAnyRole(['administrador', 'dueno']);
  }

  /**
   * Verificar si es dueño
   */
  isOwner(): boolean {
    return this.hasRole('dueno');
  }

  /**
   * Establecer usuario actual
   */
  private setCurrentUser(user: User): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(true);
  }

  /**
   * Limpiar usuario actual
   */
  private clearCurrentUser(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
  }

  /**
   * Verificar usuario almacenado en localStorage
   */
  private checkStoredUser(): void {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        const user: User = JSON.parse(storedUser);
        this.currentUserSubject.next(user);
        this.isAuthenticatedSubject.next(true);
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('currentUser');
      }
    }
  }
}
