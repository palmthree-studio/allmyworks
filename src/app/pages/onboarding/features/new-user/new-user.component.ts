import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { CentralService } from 'src/app/shared/services/central.service';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewUserComponent implements OnInit {

  profileForm!: FormGroup;
  destroyed = new Subject();
  destroyRef = inject(DestroyRef);
  backgroundImageUrl: SafeStyle | undefined;

  constructor(
    private fb: FormBuilder,
    private centralService:CentralService,
    private sanitizer: DomSanitizer
  ){}

  ngOnInit(): void {

    const destroyed = new Subject();
 
    this.destroyRef.onDestroy(() => {
      destroyed.next(void 0);
      destroyed.complete();
    });

    this.profileForm = this.fb.group({
      name: [''],
      username: [''],
      img: ['assets/img/profile.png']
    });

    // Subscribe to form value changes
    this.profileForm.valueChanges.pipe(
      takeUntil(this.destroyed),
    ).subscribe(val => {
      console.log(val);
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
        this.backgroundImageUrl = this.sanitizer.bypassSecurityTrustStyle(`url(${url})`);
      };
      reader.readAsDataURL(file);
    }
  }

}
