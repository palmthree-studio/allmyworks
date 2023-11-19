import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Profile, Project, ProjectMetrics, ProjectStatus, Socials } from '../models/models';


@Injectable({
  providedIn: 'root'
})
export class CentralService {
  profile = new BehaviorSubject<Profile>({
    name:'',
    username:'',
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
  isFormValid = new BehaviorSubject<boolean>(false);

  constructor() { }

  getFormStatus(): Observable<boolean> {
    return this.isFormValid.asObservable();
  }

  setFormStatus(isValid:boolean): void {
    this.isFormValid.next(isValid);
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

  getProject(): Observable<Omit<Project, 'id'>> {
    return this.project.asObservable();
  }

  setProject(project:Omit<Project, 'id'>): void {
    this.project.next(project)
  }

}
