import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ProjectMetrics, ProjectStatus } from '../../models/models'
import { NumeralPipe } from 'src/app/numeral.pipe';

@Component({
  selector: 'app-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    NumeralPipe
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChipComponent {
  @Input() customValue:boolean = false;
  @Input() chipValue:ProjectStatus | ProjectMetrics | undefined;

  isProjectStatus(value: ProjectStatus | ProjectMetrics): value is ProjectStatus {
    return (value as ProjectStatus).id !== undefined;
  }

  isProjectMetrics(value: ProjectStatus | ProjectMetrics): value is ProjectMetrics {
    return (value as ProjectMetrics).currency !== undefined;
  }
}
