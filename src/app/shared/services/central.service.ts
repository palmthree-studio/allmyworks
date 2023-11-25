import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Profile, Project, ProjectMetrics, ProjectStatus, Socials } from '../models/models';


@Injectable({
  providedIn: 'root'
})
export class CentralService {
  profile = new BehaviorSubject<Profile>({
    name:'Adam',
    username:'adamishere',
    img:'assets/img/profile.png'
  });
  socials = new BehaviorSubject<Socials>({
    xProfile:'',
    igProfile:'',
    urlToPromote:'',
    msgToPromote:''
  });
  project = new BehaviorSubject<Omit<Project, 'id'>>({
    name:'Project name',
    img:'',
    status:{
      id:1,
      name: '🛠️ Building'
    },
    metrics:{} as ProjectMetrics,
    description: null,
    url: null
  });
  projects = new BehaviorSubject<Project[]>([{
    id:1,
    img: '/assets/img/icon.svg',
    name:'Palmthree Studio',
    status: {
      name: '🚀 Active',
      id: 0
    },
    metrics:{} as ProjectMetrics,
    description: null,
    url: null
  },{
    id:2,
    img: '/assets/img/icon.svg',
    name:'Palmthree',
    status: {
      name: '🚀 Active',
      id: 0
    },
    metrics:{} as ProjectMetrics,
    description: null,
    url: null
  },{
    id:3,
    img: '/assets/img/icon.svg',
    name:'Palmt',
    status: {
      name: '🚀 Active',
      id: 0
    },
    metrics:{} as ProjectMetrics,
    description: null,
    url: null
  }]);
  isFormValid = new BehaviorSubject<boolean>(false);
  isSocialsFormValid = new BehaviorSubject<boolean>(false);
  isProjectsFormValid = new BehaviorSubject<boolean>(false);
  isSettingsFormValid = new BehaviorSubject<boolean>(false);
  isProjectsListValid = new BehaviorSubject<boolean>(false);

  constructor() { }

  getFormStatus(type?:string): Observable<boolean> {
    switch (type) {
      case 'Socials':
        return this.isSocialsFormValid.asObservable();
      case 'Projects':
        return this.isProjectsFormValid.asObservable();
      case 'Settings':
        return this.isSettingsFormValid.asObservable();
      default:
        return this.isFormValid.asObservable();
    }
  }

  setFormStatus(isValid:boolean, type?:string): void {
    switch (type) {
      case 'Socials':
         this.isSocialsFormValid.next(isValid);
        break;
      case 'Projects':
         this.isProjectsFormValid.next(isValid);
        break;
      case 'Settings':
         this.isSettingsFormValid.next(isValid);
        break;
      default:
         this.isFormValid.next(isValid);
        break;
    }
  }

  setProjectsListStatus(isValid:boolean): void {
    this.isProjectsListValid.next(isValid);
  }

  getProjectsListStatus(): Observable<boolean> {
    return this.isProjectsListValid.asObservable();
  } 

  getProfile(): Observable<Profile> {
    return this.profile.asObservable();
  }

  setProfile(profile:Profile): void {
    this.profile.next(profile)
  }

  getSocials(): Observable<Socials> {
    return this.socials.asObservable();
  }

  setSocials(socials:Socials): void {
    this.socials.next(socials)
  }

  getProjects(): Observable<Project[]> {
    return this.projects.asObservable();
  }

  getProject(): Observable<Omit<Project, 'id'>> {
    return this.project.asObservable();
  }

  setProjects(projects:Project[]): void {
    this.projects.next(projects)
  }

  setProject(project:Omit<Project, 'id'>): void {
    this.project.next(project)
  }

}
