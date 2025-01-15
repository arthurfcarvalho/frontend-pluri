import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';

import { UserService } from '../services/user.service';

/**
 * Guarda de rota que verifica se o usuário possui as permissões necessárias antes de permitir o acesso à rota.
 * Caso o usuário não tenha as permissões necessárias, ele é redirecionado para a página de acesso negado.
 */
export const permGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  // Obtém as permissões exigidas configuradas na rota
  const reqPerm = route.data['perms'];

  /**
   * Verifica se o usuário possui as permissões necessárias.
   * - Se o usuário não tiver as permissões:
   *   - Redireciona para a página de acesso negado (`/acesso-negado`).
   *   - Retorna `false` para bloquear o acesso à rota.
   * - Se o usuário tiver as permissões:
   *   - Retorna `true` para permitir o acesso à rota.
   */
  return userService.hasPermission(reqPerm).pipe(
    map(hasPermission => {
        if(!hasPermission){
          router.navigate(['/acesso-negado']);
          return false;
      }
        return true;
    })
  )

};
