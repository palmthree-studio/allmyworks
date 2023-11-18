import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ChipComponent } from '../chip/chip.component';
import { Project } from '../../models/models';
import { ButtonComponent } from "../button/button.component";
import { Observable, combineLatest, map, of, startWith } from 'rxjs';


@Component({
    selector: 'app-project-card',
    templateUrl: './project-card.component.html',
    styleUrls: ['./project-card.component.scss'],
    standalone: true,
    imports: [
        NgClass,
        NgIf,
        NgFor,
        ChipComponent,
        ButtonComponent,
        AsyncPipe
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectCardComponent implements OnInit {
  @Input() newProject$!: Observable<Omit<Project, 'id'>>;
  @Input() projects: Project[] = [];
  combinedProjects$!: Observable<Project[]>;

  ngOnInit() {
    this.combinedProjects$ = combineLatest([this.newProject$.pipe(startWith(null)), of(this.projects)]).pipe(
      map(([newProject, projects]) => {
        return newProject ? [{ ...newProject, id: 0 }, ...projects] : projects;
      })
    );
  }
}
