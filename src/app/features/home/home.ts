import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './home.html',
  styles: ``
})
export class Home implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('http://localhost:8000/BackEnd-Canchita/src/Api/listarEmpleados.php')
      .subscribe(res => console.log(res));
  }
}
