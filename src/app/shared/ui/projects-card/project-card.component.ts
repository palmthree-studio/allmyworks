import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit, ChangeDetectionStrategy, DestroyRef, inject } from '@angular/core';
import { ChipComponent } from '../chip/chip.component';
import { Project } from '../../models/models';
import { ButtonComponent } from "../button/button.component";
import { Observable, Subject, combineLatest, map, of, startWith, switchMap, takeUntil } from 'rxjs';
import { AdjustTextSizeDirective } from 'src/app/adjust-text-size.directive';
import { CentralService } from '../../services/central.service';
import { CardComponent } from "./card/card.component";
import { ChangeDetectorRef } from '@angular/core';


@Component({
    selector: 'app-project-card',
    templateUrl: './project-card.component.html',
    styleUrls: ['./project-card.component.scss'],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        NgClass,
        NgIf,
        NgFor,
        ChipComponent,
        ButtonComponent,
        AsyncPipe,
        AdjustTextSizeDirective,
        CardComponent
    ]
})
export class ProjectCardComponent implements OnInit {
  projects$!: Observable<Project[]>;
  combinedProjects$!: Observable<Project[]>;
  seeMore = false;
  destroyed$ = new Subject();
  destroyRef = inject(DestroyRef);
  newProject!: Project;
  addNewProject$!: Observable<boolean>;

  constructor(
    private centralService:CentralService,
    private cdr: ChangeDetectorRef
  ){}

  ngOnInit() {

    this.destroyRef.onDestroy(() => {
      this.destroyed$.next(void 0);
      this.destroyed$.complete();
    });

    this.projects$ = this.centralService.getProjects();
    this.centralService.getProject()
    .pipe(
      takeUntil(this.destroyed$)
    )
    .subscribe({
      next: newProject => {
        this.newProject = {... newProject, id:0};
        this.cdr.detectChanges();
      }
    })

    this.addNewProject$ = this.centralService.getProjectCreationStatus()
  }

  getDetails(): void {
    this.seeMore = true;
  }
}
