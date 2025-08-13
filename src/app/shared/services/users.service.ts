import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces';

export interface UserResponse {
  success: boolean;
  message: string;
  user?: User;
  users?: User[];
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = 'http://localhost:8000/src/Api';

  constructor(private http: HttpClient) {}

  /**
   * Obtener todos los usuarios/empleados
   */
  getUsers(): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.apiUrl}/listarEmpleados.php`);
  }

  /**
   * Crear nuevo usuario
   */
  createUser(userData: Partial<User>): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${this.apiUrl}/register.php`, userData);
  }

  /**
   * Actualizar usuario
   */
  updateUser(userData: Partial<User>): Observable<UserResponse> {
    return this.http.put<UserResponse>(`${this.apiUrl}/modificarEmpleado.php`, userData);
  }

  /**
   * Eliminar usuario
   */
  deleteUser(userId: number): Observable<UserResponse> {
    return this.http.delete<UserResponse>(`${this.apiUrl}/eliminarEmpleado.php?id=${userId}`);
  }

  /**
   * Obtener usuario por ID
   */
  getUserById(userId: number): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.apiUrl}/listarEmpleados.php?id=${userId}`);
  }
}
