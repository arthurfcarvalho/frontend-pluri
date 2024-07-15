import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';

export const redirectIfAuthenticatedGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  if(userService.isAuthenticated()){
    router.navigate(['/home']);
    return false;
  }

  return true;
};
