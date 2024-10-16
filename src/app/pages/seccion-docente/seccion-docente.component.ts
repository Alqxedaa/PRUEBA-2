import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-seccion-docente',
  templateUrl: './seccion-docente.component.html',
  styleUrls: ['./seccion-docente.component.scss'],
})
export class SeccionDocenteComponent{
  nombre: string= ' ';

  secciones: string[] = ['Cursos', 'Sección 2', 'Sección 3', 'Sección 4', 'Sección 5', 'Sección 6'];
  link: string = '/generar-qr';

  constructor(private authService: AuthService) {
    this.authService.usuario$.subscribe(nombre => {
      this.nombre = nombre;
    });
  }


}
