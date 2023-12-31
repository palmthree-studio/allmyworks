import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OnboardingComponent } from './pages/onboarding/onboarding.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { NewUserComponent } from './pages/onboarding/features/new-user/new-user.component';
import { ProgressBarComponent } from './pages/onboarding/ui/progress-bar/progress-bar.component';
import { HeaderComponent } from './pages/dashboard/features/header/header.component';
import { ProjectsComponent } from './pages/dashboard/features/projects/projects.component';
import { SettingsComponent } from './pages/dashboard/features/settings/settings.component';
import { ProjectCardComponent } from './shared/ui/projects-card/project-card.component';
import { ButtonComponent } from './shared/ui/button/button.component';
import { NewProjectComponent } from './shared/features/new-project/new-project.component';
import { SocialsComponent } from './shared/features/socials/socials.component';
import { LinkShareComponent } from './shared/features/link-share/link-share.component';
import { OnePagePortfolioComponent } from './shared/features/one-page-portfolio/one-page-portfolio.component';
import { ChipComponent } from './shared/ui/chip/chip.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CardComponent } from './shared/ui/projects-card/card/card.component';
import { AuthComponent } from './pages/auth/auth.component';
import { SignupComponent } from './pages/auth/signup/signup.component';
import { SigninComponent } from './pages/auth/signin/signin.component';
import { ForgetPasswordComponent } from './pages/auth/forget-password/forget-password.component';
import { ResetPasswordComponent } from './pages/auth/reset-password/reset-password.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAnalytics, provideAnalytics, ScreenTrackingService } from '@angular/fire/analytics';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { getAuth, provideAuth } from '@angular/fire/auth';

@NgModule({
  declarations: [
    AppComponent,
    OnboardingComponent,
    DashboardComponent,
    PortfolioComponent,
    HeaderComponent,
    ProjectsComponent,
    SettingsComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule,
    OnePagePortfolioComponent,
    ButtonComponent,
    ProjectCardComponent,
    ChipComponent,
    ProgressBarComponent,
    NewUserComponent,
    SocialsComponent,
    NewProjectComponent,
    LinkShareComponent,
    CardComponent,
    SignupComponent,
    SigninComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    provideFirebaseApp(() => initializeApp({"projectId":"all-my-works-app","appId":"1:474426880622:web:c65c0646f2d8798bccec7f","storageBucket":"all-my-works-app.appspot.com","apiKey":"AIzaSyCzWqC0xvNyDECeFOL2dQYkiALBT6hzl4c","authDomain":"all-my-works-app.firebaseapp.com","messagingSenderId":"474426880622"})),
    provideAnalytics(() => getAnalytics()),
    provideDatabase(() => getDatabase()),
    provideStorage(() => getStorage()),
    provideAuth(() => getAuth())
  ],
  providers: [
    ScreenTrackingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
