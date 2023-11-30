import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OnboardingComponent } from './pages/onboarding/onboarding.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { AuthComponent } from './pages/auth/auth.component';
import { SignupComponent } from './pages/auth/signup/signup.component';
import { SigninComponent } from './pages/auth/signin/signin.component';
import { ForgetPasswordComponent } from './pages/auth/forget-password/forget-password.component';
import { ResetPasswordComponent } from './pages/auth/reset-password/reset-password.component';
import { AuthGuard } from './auth.guard';
import { NoAuthGuard } from './no-auth.guard';

const routes: Routes = [
  { path: 'onboarding', component: OnboardingComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: ':username', component: PortfolioComponent },
  { path: 'auth', component: AuthComponent, children: [
    {path: 'sign-up', component: SignupComponent, canActivate: [NoAuthGuard]},
    {path: 'sign-in', component: SigninComponent, canActivate: [NoAuthGuard]},
    {path: 'forget', component: ForgetPasswordComponent, canActivate: [NoAuthGuard]},
    {path: 'reset', component: ResetPasswordComponent, canActivate: [NoAuthGuard]}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
