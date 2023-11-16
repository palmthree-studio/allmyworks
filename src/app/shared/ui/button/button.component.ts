import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  standalone: true,
  imports: [
    NgClass
  ]
})
export class ButtonComponent {
  @Input() size: 'Icon' | 'M' | 'L' | undefined;
  @Input() style: 'Primary' | 'Secondary' = 'Primary';
  @Output() OnClick = new EventEmitter<void>();


  btnClick(): void {
    this.OnClick.emit();
  }

}
