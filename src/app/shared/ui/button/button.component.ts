import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CentralService } from '../../services/central.service';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  standalone: true,
  imports: [
    NgClass,
    AsyncPipe,
    NgIf
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent implements OnInit {
  @Input() size: 'Icon' | 'M' | 'L' | undefined;
  @Input() style: 'Primary' | 'Secondary' = 'Primary';
  @Input() isValid$: Observable<boolean> | undefined;
  @Output() onClick = new EventEmitter<void>();

  constructor(
    private centralService:CentralService
  ){}

  ngOnInit(): void {
  }

  btnClick(): void {
    this.onClick.emit();
  }

}
