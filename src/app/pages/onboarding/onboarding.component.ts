import { Component } from '@angular/core';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss']
})
export class OnboardingComponent {
  currentStep = 3;
  totalStep = 3;

  nextStep(): void {
    console.log("go");
    this.currentStep++;
  }
}
