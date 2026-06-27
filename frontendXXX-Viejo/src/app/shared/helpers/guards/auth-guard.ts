import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';


export const authGuard: CanActivateFn = (route, state) => {

  //return true;
  
  const authService = inject(AuthService);
  const router = inject(Router);

  // Example using modern Signal-based state checking
  if (authService.isLoggedIn()) { 
    return true; 
  }

  // Redirect unauthenticated users to login page
  return router.createUrlTree(['/login']); 
};