import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CentralService } from '../../services/central.service';
import { Observable } from 'rxjs';
import { Profile } from '../../models/models';
import { AsyncPipe, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-link-share',
  templateUrl: './link-share.component.html',
  styleUrls: ['./link-share.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    FormsModule
  ]
})
export class LinkShareComponent implements OnInit {
  URL = 'https://AllMy.Works/';
  profile$: Observable<Profile> | undefined;

  constructor(
    private centralService:CentralService
  ){}

  ngOnInit(): void {
    this.profile$ = this.centralService.getProfile();
  }

}
