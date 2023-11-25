import { Component, DestroyRef, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { Observable, Subject, combineLatest, forkJoin, take, takeUntil, tap } from 'rxjs';
import { Profile, Project, Socials } from 'src/app/shared/models/models';
import { CentralService } from 'src/app/shared/services/central.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @ViewChild('socialsTarget') socialsTarget: ElementRef | undefined;
  @ViewChild('projectsTarget') projectsTarget: ElementRef | undefined;
  @ViewChild('settingsTarget') settingsTarget: ElementRef | undefined;
  initialSocialsForm: Socials | null = null;
  initialProjectsList: unknown;
  initialSettingsForm: unknown;
  currentSocialsForm: Socials | undefined;
  currentProjectsList: Project[] | undefined;
  currentSettingsForm: Profile | undefined;
  isSocialsFormValid = true;
  isSettingsFormValid = true;
  isProjectsFormValid = true;
  addNewProject = false;
  destroyed$ = new Subject();
  destroyRef = inject(DestroyRef);

  constructor(
    private centralService:CentralService
  ){}

  ngOnInit(): void {
      this.destroyRef.onDestroy(() => {
        this.destroyed$.next(void 0);
        this.destroyed$.complete();
      });

      // Set initial values on first emission
      let initialDataSet = false;

      combineLatest({
        socials: this.centralService.getSocials(),
        projects: this.centralService.getProjects(),
        settings: this.centralService.getProfile()
      })
      .pipe(
        tap(({ socials, projects, settings }) => {
          if (!initialDataSet) {
            this.initialSocialsForm = socials;
            this.initialProjectsList = projects;
            this.initialSettingsForm = settings;
            initialDataSet = true;
          }

          // Update current values (and possibly compare with initial values if needed)
          this.currentSocialsForm = socials;
          this.currentProjectsList = projects;
          this.currentSettingsForm = settings;
        }),
        takeUntil(this.destroyed$)
      ).subscribe();

      this.centralService.getFormStatus('Socials')
        .pipe(
          takeUntil(this.destroyed$)
          )
        .subscribe({
          next:valid => this.isSocialsFormValid = valid
        });
      this.centralService.getFormStatus('Settings')
        .pipe(
          takeUntil(this.destroyed$)
          )
        .subscribe({
          next:valid => this.isSettingsFormValid = valid
        });
        this.centralService.getProjectsListStatus()
        .pipe(
          takeUntil(this.destroyed$)
          )
        .subscribe({
          next:valid => {
            this.isProjectsFormValid = valid;
          }
        });
  }

  scrollToTarget(destination:string): void {
    switch (destination) {
      case 'Socials':
        this.socialsTarget?.nativeElement.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'Projects':
        this.projectsTarget?.nativeElement.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'Settings':
        this.settingsTarget?.nativeElement.scrollIntoView({ behavior: 'smooth' });
        break;
    }
  }

  isSocialsFormModifiedAndValid(): boolean {
    return JSON.stringify(this.initialSocialsForm) !== JSON.stringify(this.currentSocialsForm) &&
           this.isSocialsFormValid;
  }

  isProjectsListModifiedAndValid(): boolean {
    return JSON.stringify(this.initialProjectsList) !== JSON.stringify(this.currentProjectsList)
  }

  isSettingsFormModifiedAndValid(): boolean {
    return JSON.stringify(this.initialSettingsForm) !== JSON.stringify(this.currentSettingsForm) &&
           this.isSettingsFormValid;
  }

}
