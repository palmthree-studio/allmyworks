import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CentralService } from 'src/app/shared/services/central.service';


@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss']
})
export class OnboardingComponent implements OnInit {
  currentStep = 3;
  totalStep = 3;
  formIsValid$: Observable<boolean> = of(false);

  constructor(
    private centralService:CentralService
  ){}

  ngOnInit(): void {
    this.formIsValid$ = this.centralService.getFormStatus();
  }

  nextStep(): void {
    this.currentStep++;
  }
}
