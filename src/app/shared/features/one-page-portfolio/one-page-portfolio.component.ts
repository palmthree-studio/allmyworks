import { Component } from '@angular/core';
import { ButtonComponent } from '../../ui/button/button.component';
import { ProjectCardComponent } from '../../ui/project-card/project-card.component';
import { Project } from '../../models/models';

@Component({
  selector: 'app-one-page-portfolio',
  templateUrl: './one-page-portfolio.component.html',
  styleUrls: ['./one-page-portfolio.component.scss'],
  standalone: true,
  imports: [
    ButtonComponent,
    ProjectCardComponent
  ]
})
export class OnePagePortfolioComponent {
  projects: Project[] = [{
    id:0,
    name:'Project name',
    img: "/assets/img/icon.svg",
    url: 'https://allmy.works',
    description: null,
    status: {
      id:1,
      name: '🛠️ Building'
    },
    metrics: {
      currency: 'USD',
      value: 2000000,
      name: 'MRR'
    }
  }]
}
