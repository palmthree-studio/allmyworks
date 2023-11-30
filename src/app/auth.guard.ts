import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './shared/services/auth.service';
import { inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';

export const AuthGuard: CanActivateFn = async (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  try {
    const authorized = await firstValueFrom(authService.isUserAuthorized());
    if (authorized) {
      let hasFinished = await authService.hasUserFinishedOnboarding();

      // Vérifiez si l'utilisateur est déjà sur la bonne route
      if (!hasFinished && state.url !== '/onboarding') {
        router.navigate(['/onboarding']);
        return false;
      } else if (hasFinished && state.url !== '/dashboard') {
        router.navigate(['/dashboard']);
        return false;
      }

      // Si l'utilisateur est déjà sur la bonne route
      return true;
    } else {
      router.navigate(['/auth/sign-in']);
      return false;
    }
  } catch (error) {
    console.error("AuthGuard error:", error);
    return false;
  }
};

