import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';
import { map } from 'rxjs/operators';

export const redirectIfAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService); // Inyectar el servicio de autenticación
  const router = inject(Router); // Inyectar el router para redireccionar

  return authService.isLoggedIn().pipe(
    map(isAuthenticated => {
      if (isAuthenticated) {
        router.navigate(['/home']); // Redirigir a la página de inicio si ya está autenticado
        return false; // Bloquear el acceso a la página de login
      } else {
        return true; // Permitir el acceso a la página de login si no está autenticado
      }
    })
  );
};
