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
    img:'assets/img/icon.svg',
    status:{
      id:1,
      name: '🛠️ Building'
    },
    metrics:{} as ProjectMetrics,
    description: null,
    url: null
  });

  constructor() { }

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
    console.log(JSON.stringify(project.metrics));
    this.project.next(project)
  }

}
