import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { MemberstackService } from './shared/services/memberstack.service';
import { inject } from '@angular/core';

export const AuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const memberstackService = inject(MemberstackService);
  const router = inject(Router);

  if (memberstackService.isUserAuthorized()) {
    return true;
  } else {
    router.navigate(['/auth/sign-in']);
    return false;
  }
};
