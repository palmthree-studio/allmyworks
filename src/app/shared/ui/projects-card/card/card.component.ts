import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AdjustTextSizeDirective } from 'src/app/adjust-text-size.directive';
import { Project } from 'src/app/shared/models/models';
import { ButtonComponent } from '../../button/button.component';
import { ChipComponent } from '../../chip/chip.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    NgClass,
    ChipComponent,
    ButtonComponent,
    AsyncPipe,
    AdjustTextSizeDirective,
  ]
})
export class CardComponent {

  @Input() project!: Project;
  seeMore = false;
  activateButton = true;

  getDetails(): void {
    this.seeMore = true;
  }

}
