import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:8000/BackEnd-Canchita/src/Api'; // Ajusta la ruta según tu backend

  constructor(private http: HttpClient) {}

  login(email: string, clave: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login.php`, { email, clave });
  }

  register(datos: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register.php`, datos);
  }

  listarEmpleados(): Observable<any> {
    return this.http.get(`${this.apiUrl}/listarEmpleados.php`);
  }

}
