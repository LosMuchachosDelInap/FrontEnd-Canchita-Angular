import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '@envs/environment';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class Home implements OnInit {
  
  constructor(private http: HttpClient) {}

  ngOnInit() {
    console.log('Componente Home inicializado');
    // Aquí puedes cargar datos generales para la página de inicio
    // como estadísticas, canchas disponibles, etc.
  }
}
