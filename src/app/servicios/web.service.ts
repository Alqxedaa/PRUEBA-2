import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebService {

  httpClient = inject(HttpClient); // Inyectar HttpClient para hacer peticiones HTTP.

  constructor() { }

  request(type: 'POST' | 'GET' | 'PUT' | 'DELETE', url: string, path: string, body: any = {}): Promise<any> { // Crear una promesa para realizar la petición HTTP.
    return new Promise((resolve, reject) => { // Aceptar rechazo de promesas.
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });

      if (type === 'POST') {
        this.httpClient.post(url + '/' + path, body, { headers }).subscribe(data => {
          resolve(data); // Resuelve la promesa con el resultado.
        }, error => {
          console.error('Error en la solicitud POST:', error);
          reject(error); // Rechaza la promesa en caso de error.
        });
      }

      if (type === 'GET') {
        this.httpClient.get(url + '/' + path, { headers }).subscribe(data => {
          resolve(data); // Resuelve la promesa con el resultado.
        }, error => {
          console.error('Error en la solicitud GET:', error);
          reject(error); // Rechaza la promesa en caso de error.
        });
      }

      if (type === 'PUT') {
        this.httpClient.put(url + '/' + path, body, { headers }).subscribe(data => {
          resolve(data); // Resuelve la promesa con el resultado.
        }, error => {
          console.error('Error en la solicitud PUT:', error);
          reject(error); // Rechaza la promesa en caso de error.
        });
      }

      if (type === 'DELETE') {
        this.httpClient.delete(url + '/' + path, { headers }).subscribe(data => {
          resolve(data); // Resuelve la promesa con el resultado.
        }, error => {
          console.error('Error en la solicitud DELETE:', error);
          reject(error); // Rechaza la promesa en caso de error.
        });
      }
    });
  }
}
