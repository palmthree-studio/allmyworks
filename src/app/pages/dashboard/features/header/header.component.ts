import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {

  constructor(
    private auth:AuthService
  ){}

  @Output() destination = new EventEmitter<string>();

  scrollTo(destination:string): void {
    this.destination.emit(destination);
  }

  logout(): void {
    this.auth.logout();
  }

}
