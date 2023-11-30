import { Component, OnInit } from '@angular/core';
import { CentralService } from './shared/services/central.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'AllMyWorks';
  loader$!: Observable<boolean>;

  constructor(
    private central:CentralService
  ){}

  ngOnInit(): void {
      this.loader$ = this.central.getLoaderStatus();
  }
}
