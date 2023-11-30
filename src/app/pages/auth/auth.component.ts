import { Component, OnInit } from '@angular/core';
import { CentralService } from 'src/app/shared/services/central.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(
    private central: CentralService
  ){}

  ngOnInit(): void {
      this.central.disableLoader();
  }

}
