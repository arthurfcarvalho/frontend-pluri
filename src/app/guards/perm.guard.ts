import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { UserService } from '../services/user.service';

export const permGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  const reqPerm = route.data['perms'];
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
