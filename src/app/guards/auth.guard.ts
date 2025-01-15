import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { UserService } from '../services/user.service';

/**
 * Guarda de rota que verifica se o usuário está autenticado antes de permitir o acesso à rota protegida.
 * Caso o usuário não esteja autenticado, redireciona para a página de login.
 */
export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  if(!userService.isAuthenticated()){
    router.navigate(['/login']);
    return false;
  }

  return true;
};
