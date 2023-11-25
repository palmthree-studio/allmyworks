import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CentralService } from 'src/app/shared/services/central.service';
import { Router } from '@angular/router';


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

  constructor(
    private centralService:CentralService,
    private router:Router
  ){}

  ngOnInit(): void {
    this.formIsValid$ = this.centralService.getFormStatus();
  }

  nextStep(): void {
    this.currentStep++;
  }

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  addNewProject(): void {
    this.router.navigate(['/dashboard'], { queryParams: { new: '1' } });
  }
}
