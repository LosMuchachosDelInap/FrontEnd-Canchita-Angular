import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '@envs/environment';

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
    this.http.get(`${environment.apiURL}/listarEmpleados.php`)
      .subscribe(res => console.log(res));
  }
}
