import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

export const loginGuard: CanActivateFn = (route, state) => {
  const authSrv = inject(AuthService);
  const router = inject(Router);

  if (authSrv.isLoggedIn()) {
    router.navigate(['/home']);
    return false;
  }
  return !authSrv.isLoggedIn();
};
