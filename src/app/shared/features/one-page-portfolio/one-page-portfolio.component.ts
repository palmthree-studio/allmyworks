import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ButtonComponent } from '../../ui/button/button.component';
import { ProjectCardComponent } from '../../ui/project-card/project-card.component';
import { Profile, Project, Socials } from '../../models/models';
import { CentralService } from '../../services/central.service';
import { Observable, combineLatest, map } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';
import { AdjustTextSizeDirective } from 'src/app/adjust-text-size.directive';

@Component({
  selector: 'app-one-page-portfolio',
  templateUrl: './one-page-portfolio.component.html',
  styleUrls: ['./one-page-portfolio.component.scss'],
  standalone: true,
  imports: [
    ButtonComponent,
    ProjectCardComponent,
    AsyncPipe,
    NgIf,
    AdjustTextSizeDirective
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OnePagePortfolioComponent implements OnInit {
  newProject$: Observable<Omit<Project, 'id'>> = this.centralService.getProject();
  projects: Project[] = [] as Project[];
  profile$: Observable<Profile> = this.centralService.getProfile();
  socials$: Observable<Socials> = this.centralService.getSocials();
  user$ = combineLatest([this.profile$, this.socials$]).pipe(
    map(([profile, socials]) => ({ profile, socials }))
  );

  constructor(
    private centralService:CentralService
  ){}

  ngOnInit(): void {
    
  }

}
