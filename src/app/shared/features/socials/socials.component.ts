import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CentralService } from '../../services/central.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { linkedFieldsValidator, urlValidator } from 'src/app/validators.functions';
import { NgIf } from '@angular/common';

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

  socialsForm!: FormGroup;
  destroyed = new Subject();
  destroyRef = inject(DestroyRef);

  constructor(
    private fb: FormBuilder,
    private centralService:CentralService
  ){}

  ngOnInit(): void {

    const destroyed = new Subject();
 
    this.destroyRef.onDestroy(() => {
      destroyed.next(void 0);
      destroyed.complete();
    });

    this.socialsForm = this.fb.group({
      xProfile: [''],
      igProfile: [''],
      urlToPromote: ['', urlValidator()],
      msgToPromote: ['', Validators.minLength(8)]
    }, { validators: linkedFieldsValidator('urlToPromote', 'msgToPromote') });

    // Subscribe to form value changes
    this.socialsForm.valueChanges.pipe(
      takeUntil(this.destroyed),
    ).subscribe(val => {
      this.centralService.setFormStatus(this.socialsForm.valid);
      this.centralService.setSocials(val);
    });
  }

}
