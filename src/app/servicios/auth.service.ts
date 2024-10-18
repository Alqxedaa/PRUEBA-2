import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { WebService } from './web.service';
import { UsuarioAPI } from '../models/UsuarioAPI.models';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // BehaviorSubjects para manejar el estado del usuario y la autenticación
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  private usuarioSubject = new BehaviorSubject<string>('');
  usuario$ = this.usuarioSubject.asObservable();

  private usuarioCompletoSubject = new BehaviorSubject<UsuarioAPI | null>(null);
  usuarioCompleto$ = this.usuarioCompletoSubject.asObservable();

  private loginFailedSubject = new BehaviorSubject<boolean>(false);
  loginFailed$ = this.loginFailedSubject.asObservable();

  webservice = inject(WebService); // Inyecta el servicio web para hacer llamadas a la API
  private router = inject(Router); // Inyecta Router para redireccionar


  async buscarBD4(usuario: string, clave: string): Promise<void> {
    const url = 'https://670eac473e71518616557132.mockapi.io/api/v1/users';

    try {

      const res = await this.webservice.request('GET', url, '', null) as Array<UsuarioAPI>;


      const user = res.find(u => u.user === usuario && u.pass === clave);

      if (user) {
        console.log('Autenticación exitosa!', user);
        this.isAuthenticatedSubject.next(true);
        this.usuarioSubject.next(user.name);
        this.usuarioCompletoSubject.next(user);
        this.loginFailedSubject.next(false);


        if (user.rol === 'docente') {
          this.router.navigate(['/seccion-docente']);
        } else if (user.rol === 'alumno') {
          this.router.navigate(['/seccion-alumno']);
        }

      } else {
        console.warn('Credenciales incorrectas');
        this.isAuthenticatedSubject.next(false);
        this.loginFailedSubject.next(true);
      }

    } catch (error) {
      console.error('Error al buscar el usuario:', error);
      this.isAuthenticatedSubject.next(false);
      this.loginFailedSubject.next(true);
    }
  }


  async registrarNuevoUsuario(usuario: UsuarioAPI): Promise<UsuarioAPI | void> {
    const url = 'https://670eac473e71518616557132.mockapi.io/api/v1/users';
    try {

      const usuariosExistentes = await this.obtenerUsuarios();
      const usuarioExistente = usuariosExistentes.find(u => u.user === usuario.user);

      if (usuarioExistente) {
        throw new Error('El usuario ya existe');
      }

      const res = await this.webservice.request('POST', url, '', usuario) as UsuarioAPI;
      console.log('Usuario registrado con éxito:', res);
      return res;
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      throw error;
    }
  }


  async obtenerUsuarios(): Promise<UsuarioAPI[]> {
    const url = 'https://670eac473e71518616557132.mockapi.io/api/v1/users';
    try {
      const res = await this.webservice.request('GET', url, '', null) as Array<UsuarioAPI>;
      return res;
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      throw error;
    }
  }


  logout(): void {
    this.usuarioSubject.next('');
    this.usuarioCompletoSubject.next(null);
    this.isAuthenticatedSubject.next(false);
    this.loginFailedSubject.next(false);
    console.log('Usuario deslogueado');
  }


  isLoggedIn(): Observable<boolean> {
    return this.isAuthenticated$;
  }
}
