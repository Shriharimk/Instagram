import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const landingGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);
  const loginStatus = authService.loginStatus;

  if(loginStatus){
    router.navigate(['/actualpage']);
    return false;
  }
  else{
    return true;
  }
};
