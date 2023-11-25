import { ChangeDetectionStrategy, Component, DestroyRef, Input, OnInit, inject } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { CentralService } from 'src/app/shared/services/central.service';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { ChangeDetectorRef } from '@angular/core';
import { Profile } from 'src/app/shared/models/models';
import { ButtonComponent } from "../../../../shared/ui/button/button.component";
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-new-user',
    templateUrl: './new-user.component.html',
    styleUrls: ['./new-user.component.scss'],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ReactiveFormsModule,
        ButtonComponent,
        NgIf
    ]
})
export class NewUserComponent implements OnInit {

  @Input() isInDashboard?: boolean | undefined;
  profile:Profile | undefined;
  profileForm!: FormGroup;
  destroyed$ = new Subject();
  destroyRef = inject(DestroyRef);
  backgroundImageUrl: SafeStyle | undefined;
  username = 'Your username';

  constructor(
    private fb: FormBuilder,
    private centralService:CentralService,
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef
  ){}

  ngOnInit(): void {
 
    this.destroyRef.onDestroy(() => {
      this.destroyed$.next(void 0);
      this.destroyed$.complete();
    });

    this.username = this.isInDashboard ? 'Your username' : 'Choose an username';

    //Subscribe to profile value
    this.centralService.getProfile()
    .pipe(
      takeUntil(this.destroyed$)
    )
    .subscribe({
      next:profile =>{
        this.profile = profile;
        this.backgroundImageUrl = this.sanitizer.bypassSecurityTrustStyle(`url(${this.profile.img})`);
      }
    })

    this.profileForm = this.fb.group({
      name: [this.profile?.name ?? '', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15)
      ]],
      username: [this.profile?.username ?? '', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15)
      ]],
      img: [this.profile?.img ?? '']
    });

    // Subscribe to form value changes
    this.profileForm.valueChanges.pipe(
      takeUntil(this.destroyed$),
    ).subscribe(val => {
      // For onboarding
      this.centralService.setFormStatus(this.profileForm.valid);
      // For dashboard
      this.centralService.setFormStatus(this.profileForm.valid, 'Settings');
      this.centralService.setProfile(val);
    });
  }

  onFileSelect(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    let file: File | null = element.files ? element.files[0] : null;

    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        // This will give you the Data URL.
        const url = (e.target as FileReader).result;
        this.profileForm.patchValue({ img: url });
        this.centralService.setProfile(this.profileForm.value);
        this.backgroundImageUrl = this.sanitizer.bypassSecurityTrustStyle(`url(${url})`);
        this.cdr.detectChanges();
      };
      reader.readAsDataURL(file);
    }
  }

}
