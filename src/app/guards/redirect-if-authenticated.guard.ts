import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { UserService } from '../services/user.service';

/**
 * Guarda de rota que redireciona o usuário autenticado para a página inicial (`/home`)
 * caso tente acessar uma rota destinada a usuários não autenticados, como login ou cadastro.
 */
export const redirectIfAuthenticatedGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  if(userService.isAuthenticated()){
    router.navigate(['/home']);
    return false;
  }

  return true;
};
