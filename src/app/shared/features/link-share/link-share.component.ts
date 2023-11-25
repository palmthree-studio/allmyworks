import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
  check = false;

  constructor(
    private centralService:CentralService,
    private cdr:ChangeDetectorRef
  ){}

  ngOnInit(): void {
    this.profile$ = this.centralService.getProfile();
  }

  copyToClipboard(username:string): void {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.URL + username;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.check = true;
    setTimeout(() => {
      this.check = false;
      this.cdr.detectChanges();
    }, 4000);
  }

}
