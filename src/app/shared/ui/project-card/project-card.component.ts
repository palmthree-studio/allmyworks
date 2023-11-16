import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ChipComponent } from '../chip/chip.component';
import { Project } from '../../models/models';
import { ButtonComponent } from "../button/button.component";


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
        ButtonComponent
    ]
})
export class ProjectCardComponent {
  @Input() projects: Project[] = [];
}
