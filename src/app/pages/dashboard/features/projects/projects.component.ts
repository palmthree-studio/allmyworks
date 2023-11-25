import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Project } from 'src/app/shared/models/models';
import { CentralService } from 'src/app/shared/services/central.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsComponent implements OnInit {
  private initialListSet = false;
  initialList: Project[] = [];
  currentProjects: Project[] = [];
  destroyed$ = new Subject();
  destroyRef = inject(DestroyRef);

  constructor(
    private centralService: CentralService
  ) { }

  ngOnInit(): void {
    this.destroyRef.onDestroy(() => {
      this.destroyed$.next(void 0);
      this.destroyed$.complete();
    });

    this.centralService.getProjects()
      .pipe(takeUntil(this.destroyed$))
      .subscribe(projects => {
        if (!this.initialListSet) {
          this.initialList = [...projects];
          this.initialListSet = true;
        }
        this.currentProjects = projects;
      });
  }

  drop(event: CdkDragDrop<Project[]>): void {
    moveItemInArray(this.currentProjects, event.previousIndex, event.currentIndex);
    this.centralService.setProjects(this.currentProjects);
    this.centralService.setProjectsListStatus(JSON.stringify(this.initialList) !== JSON.stringify(this.currentProjects));
  }
}
