import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { WebService } from './web.service'; // Asegúrate de que WebService está bien implementado.
import { UsuarioAPI } from '../models/UsuarioAPI.models'; // Verifica que el modelo UsuarioAPI tenga las propiedades correctas.
import { Router } from '@angular/router'; // Asegúrate de importar Router

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

  // Método para buscar en la base de datos de usuarios
  async buscarBD4(usuario: string, clave: string): Promise<void> {
    const url = 'https://670eac473e71518616557132.mockapi.io/api/v1/users';

    try {
      // Realiza la solicitud GET a la API sin duplicar 'users'
      const res = await this.webservice.request('GET', url, '', null) as Array<UsuarioAPI>;

      // Busca el usuario con las credenciales correctas
      const user = res.find(u => u.user === usuario && u.pass === clave);

      if (user) {
        console.log('Autenticación exitosa!', user);
        this.isAuthenticatedSubject.next(true);
        this.usuarioSubject.next(user.name);
        this.usuarioCompletoSubject.next(user);
        this.loginFailedSubject.next(false);

        // Redirige según el tipo de usuario
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

  // Método para registrar un nuevo usuario
  async registrarNuevoUsuario(usuario: UsuarioAPI): Promise<UsuarioAPI | void> {
    const url = 'https://670eac473e71518616557132.mockapi.io/api/v1/users';
    try {
      // Verifica si el usuario ya existe antes de registrarlo
      const usuariosExistentes = await this.obtenerUsuarios();
      const usuarioExistente = usuariosExistentes.find(u => u.user === usuario.user);

      if (usuarioExistente) {
        throw new Error('El usuario ya existe');
      }

      const res = await this.webservice.request('POST', url, '', usuario) as UsuarioAPI;
      console.log('Usuario registrado con éxito:', res);
      return res; // Devuelve el resultado del registro
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      throw error;
    }
  }

  // Método para obtener todos los usuarios desde la API
  async obtenerUsuarios(): Promise<UsuarioAPI[]> {
    const url = 'https://670eac473e71518616557132.mockapi.io/api/v1/users';
    try {
      const res = await this.webservice.request('GET', url, '', null) as Array<UsuarioAPI>;
      return res; //lista de usuarios existentes
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      throw error;
    }
  }

  // Método para cerrar sesión
  logout(): void {
    this.usuarioSubject.next('');
    this.usuarioCompletoSubject.next(null);
    this.isAuthenticatedSubject.next(false);
    this.loginFailedSubject.next(false);
    console.log('Usuario deslogueado');
  }

  // Método para comprobar si el usuario está autenticado
  isLoggedIn(): Observable<boolean> {
    return this.isAuthenticated$; // Devuelve el observable con el estado de autenticación
  }
}
