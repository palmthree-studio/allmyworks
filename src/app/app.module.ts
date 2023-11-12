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
import { ProjectCardComponent } from './shared/ui/project-card/project-card.component';
import { ButtonComponent } from './shared/ui/button/button.component';
import { NewProjectComponent } from './shared/features/new-project/new-project.component';
import { SocialsComponent } from './shared/features/socials/socials.component';
import { LinkShareComponent } from './shared/features/link-share/link-share.component';
import { OnePagePortfolioComponent } from './shared/features/one-page-portfolio/one-page-portfolio.component';

@NgModule({
  declarations: [
    AppComponent,
    OnboardingComponent,
    DashboardComponent,
    PortfolioComponent,
    NewUserComponent,
    ProgressBarComponent,
    HeaderComponent,
    ProjectsComponent,
    SettingsComponent,
    ProjectCardComponent,
    ButtonComponent,
    NewProjectComponent,
    SocialsComponent,
    LinkShareComponent,
    OnePagePortfolioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
