import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { Observable, Subject, combineLatest, of, takeUntil, tap } from 'rxjs';
import { CentralService } from 'src/app/shared/services/central.service';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/shared/services/crud.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Profile, Project, Socials } from 'src/app/shared/models/models';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss']
})
export class OnboardingComponent implements OnInit {
  currentStep = 1;
  totalStep = 3;
  formIsValid$: Observable<boolean> = of(false);
  activeButtons = true;
  userID!: string;
  currentUserData!: Profile;
  currentSocials!: Socials;
  currentProject!: Omit<Project, "id">;
  destroyed$ = new Subject();
  destroyRef = inject(DestroyRef);
  timestamp = new Date().getTime();

  constructor(
    private centralService:CentralService,
    private router:Router,
    private crud:CrudService,
    private auth:AuthService
  ){}

  ngOnInit(): void {

    this.destroyRef.onDestroy(() => {
      this.destroyed$.next(void 0);
      this.destroyed$.complete();
    });

    this.formIsValid$ = this.centralService.getFormStatus();
    this.userID = this.auth.getUserID() ?? '';
    this.getCurrentStep();

    combineLatest({
      socials: this.centralService.getSocials(),
      project: this.centralService.getProject(),
      settings: this.centralService.getProfile()
    })
    .pipe(
      tap(({ socials, project, settings }) => {
        // Update current values (and possibly compare with initial values if needed)
        this.currentSocials = socials;
        this.currentProject = project;
        this.currentUserData = settings;
      }),
      takeUntil(this.destroyed$)
    ).subscribe();

  }

  nextStep(): void {
    this.currentStep++;
  }

  saveData(): void {
    switch (this.currentStep) {
      case 1:
        this.crud.uploadImage(this.userID, String(this.timestamp), this.currentUserData.img).then(
          downloadURL => {
            let path = `Portfolios/${this.userID}`;
            let data = {
              displayedName: this.currentUserData.name,
              username: this.currentUserData.username,
              img:downloadURL
            }
            this.crud.update(path, data).then(
              res => {
                let path = `Portfolios/${this.userID}/currentOnboardingStep`;
                this.crud.update(path, 2);
                this.nextStep();
              },
              err => {
                console.error(err);
              } 
            )
          },
          err => {
            console.error(err);
          }
        )
        break;
        case 2:
          let path = `Portfolios/${this.userID}/socials`;
          let data = {
            xProfile: this.currentSocials.xProfile ?? null,
            igProfile: this.currentSocials.igProfile ?? null,
            urlToPromote:this.currentSocials.urlToPromote ?? null,
            msgToPromote:this.currentSocials.msgToPromote ?? null
          }
          this.crud.create('set',path, data).then(
            res => {
              let path = `Portfolios/${this.userID}/currentOnboardingStep`;
              this.crud.update(path, 3);
              this.nextStep();
            },
            err => {
              console.error(err);
            } 
          )
        break;
        case 3:
          this.crud.uploadImage(this.userID, String(this.timestamp), this.currentProject.img).then(
            downloadURL => {
              let path = `Portfolios/${this.userID}/projects`;
              const { img, ...rest } = this.currentProject;
              let data = { ...rest, img: downloadURL };
              this.crud.create('push',path, data).then(
                res => {
                  let removePath = `Portfolios/${this.userID}/currentOnboardingStep`;
                  this.crud.delete(removePath);
                  let updatePath = `Portfolios/${this.userID}/hasFinishedOnboarding`;
                  this.crud.update(updatePath, true);
                  this.nextStep();
                },
                err => {
                  console.error(err);
                } 
              )
            },
            err => {
              console.error(err);
            }
          )
        break;
    }
  }

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  addNewProject(): void {
    this.router.navigate(['/dashboard'], { queryParams: { new: '1' } });
  }

  getCurrentStep(): void {
    let path = `Portfolios/${this.userID}/currentOnboardingStep`
    this.crud.read('object', path).then(
      currentStep => {
        this.currentStep = currentStep;
        this.centralService.disableLoader();
      },
      err => {
        console.error(err);
      }
    )
  }

}
