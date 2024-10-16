import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/servicios/auth.service';
import { UsuarioAPI } from 'src/app/models/UsuarioAPI.models'; // Importar el modelo UsuarioAPI
import { Router } from '@angular/router'; // Importar el Router

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private authService = inject(AuthService); // Obtener el servicio de autenticación
  private router = inject(Router); // Inyectar el Router para redirección
  usuario: string; // Campo para almacenar el nombre del usuario
  usuarioCompleto: UsuarioAPI; // Campo para almacenar el objeto del usuario completo

  private subscriptionUsuario: Subscription; // Subscripción para el observable del nombre del usuario
  private subscriptionUsuarioCompleto: Subscription; // Subscripción para el observable del usuario completo

  constructor() { }

  ngOnInit() {
    this.subscriptionUsuario = this.authService.usuario$.subscribe(usuario => {
      this.usuario = usuario;
      console.log('Header:', usuario);
    });

    this.subscriptionUsuarioCompleto = this.authService.usuarioCompleto$.subscribe(usuarioCompleto => {
      this.usuarioCompleto = usuarioCompleto;
    });
  }

  ngOnDestroy() {
    this.subscriptionUsuario?.unsubscribe(); // Desuscribirse del observable del nombre del usuario
    this.subscriptionUsuarioCompleto?.unsubscribe(); // Desuscribirse del observable del usuario completo
  }

  logout() {
    this.authService.logout(); // Llamar al método logout del servicio de autenticación
    this.router.navigate(['/home']); // Redirigir al inicio
  }
}
