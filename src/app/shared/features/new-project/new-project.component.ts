import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, OnInit, inject } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { CentralService } from 'src/app/shared/services/central.service';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { Project, ProjectMetrics } from '../../models/models';
import { 
  ProjectsStatus,
  metricsType, 
  currencies,
  financialsMetrics,
  otherMetrics
} from '../../constants/constants';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgFor,
    NgIf
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewProjectComponent implements OnInit {
  projectForm!: FormGroup;
  destroyed$ = new Subject();
  destroyRef = inject(DestroyRef);
  backgroundImageUrl: SafeStyle | undefined;
  project: Project | undefined;
  projectStatus = ProjectsStatus;
  metricsType = metricsType;
  currencies = Object.keys(currencies);
  financialsMetrics = financialsMetrics;
  otherMetrics = otherMetrics;
  currentMetric = 'Financial';

  constructor(
    private fb: FormBuilder,
    private centralService:CentralService,
    private sanitizer: DomSanitizer,
    private cdr:ChangeDetectorRef
  ){}

  ngOnInit(): void {

    this.centralService.setFormStatus(false);
 
    this.destroyRef.onDestroy(() => {
      this.destroyed$.next(void 0);
      this.destroyed$.complete();
    });

    this.projectForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      img: ['', Validators.required],
      status: [this.projectStatus[1], Validators.required],
      description: [null],
      url: [null],
      projectAchievement: ['Financial'],
      metrics: this.fb.group({ // Créez un FormGroup imbriqué ici
        currency: [''],
        value: [0],
        name: ['']
      })
    });

    // Subscribe to form value changes
    this.projectForm.valueChanges.pipe(
      takeUntil(this.destroyed$),
    ).subscribe(val => {
      this.centralService.setFormStatus(this.projectForm.valid);
      this.centralService.setProject(val);
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
        this.projectForm.patchValue({ img: url });
        this.centralService.setProject(this.projectForm.value);
        this.backgroundImageUrl = this.sanitizer.bypassSecurityTrustStyle(`url(${url})`);
        this.cdr.detectChanges();
      };
      reader.readAsDataURL(file);
    }
  }
}
