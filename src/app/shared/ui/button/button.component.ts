import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  standalone: true,
  imports: [
    NgClass
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
  @Input() size: 'Icon' | 'M' | 'L' | undefined;
  @Input() style: 'Primary' | 'Secondary' = 'Primary';
  @Output() onClick = new EventEmitter<void>();


  btnClick(): void {
    this.onClick.emit();
  }

}
