import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';
import { map } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService); // Inyectar el servicio de autenticación
  const router = inject(Router); // Inyectar el router para redireccionar

  return authService.isLoggedIn().pipe(
    map(isAuthenticated => {
      if (isAuthenticated) {
        return true; // Si está autenticado, permitir acceso
      } else {
        router.navigate(['/login']); // Redirigir al login si no está autenticado
        return false; // Denegar acceso si no está autenticado
      }
    })
  );
};
