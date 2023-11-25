import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CentralService } from '../../services/central.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { linkedFieldsValidator, urlValidator } from 'src/app/validators.functions';
import { NgIf } from '@angular/common';
import { Socials } from '../../models/models';

@Component({
  selector: 'app-socials',
  templateUrl: './socials.component.html',
  styleUrls: ['./socials.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SocialsComponent implements OnInit {

  social:Socials | undefined;
  socialsForm!: FormGroup;
  destroyed$ = new Subject();
  destroyRef = inject(DestroyRef);

  constructor(
    private fb: FormBuilder,
    private centralService:CentralService
  ){}

  ngOnInit(): void {
 
    this.destroyRef.onDestroy(() => {
      this.destroyed$.next(void 0);
      this.destroyed$.complete();
    });

    //Subscribe to profile value
    this.centralService.getSocials()
    .pipe(
      takeUntil(this.destroyed$)
    )
    .subscribe({
      next:social =>{
        this.social = social;
      }
    })

    this.socialsForm = this.fb.group({
      xProfile: [this.social?.xProfile ?? ''],
      igProfile: [this.social?.igProfile ?? ''],
      urlToPromote: [this.social?.urlToPromote ?? '', urlValidator()],
      msgToPromote: [this.social?.msgToPromote ?? '', Validators.minLength(8)]
    }, { validators: linkedFieldsValidator('urlToPromote', 'msgToPromote') });

    // Subscribe to form value changes
    this.socialsForm.valueChanges.pipe(
      takeUntil(this.destroyed$),
    ).subscribe(val => {
      // For onboarding
      this.centralService.setFormStatus(this.socialsForm.valid);
      // For dashboard
      this.centralService.setFormStatus(this.socialsForm.valid, 'Socials');
      this.centralService.setSocials(val);
    });
  }

}
