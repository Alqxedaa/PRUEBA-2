import { Component, OnInit } from '@angular/core';
import { AuthService } from'src/app/servicios/auth.service';

@Component({
  selector: 'app-seccion-alumno',
  templateUrl: './seccion-alumno.component.html',
  styleUrls: ['./seccion-alumno.component.scss'],
})
export class SeccionAlumnoComponent{
  nombre: string= ' ';
  secciones: string[] = ['Datos', 'Sección 2', 'Sección 3', 'Sección 4', 'Sección 5', 'Sección 6'];
  link: string = '/escanear-qr';


  constructor(private authService: AuthService) {
    this.authService.usuario$.subscribe(nombre => {
      this.nombre = nombre || '';
    });
  }

}

