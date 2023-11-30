import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { firstValueFrom } from 'rxjs';

export const NoAuthGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  try {
    const authorized = await firstValueFrom(authService.isUserAuthorized());
    if (!authorized) {
      return true;
    } else {
      let hasFinished = await authService.hasUserFinishedOnboarding();
      if(hasFinished){
        router.navigate(['/dashboard']);
      } else {
        router.navigate(['/onboarding']);
      }
      return false;
    }
  } catch (error) {
    console.error("NoAuthGuard error:", error);
    return false;
  }
};