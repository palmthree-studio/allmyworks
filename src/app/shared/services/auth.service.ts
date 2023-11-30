import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from './crud.service';
import { 
  Auth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  onAuthStateChanged, 
  sendPasswordResetEmail,
  signOut, 
  confirmPasswordReset
} from '@angular/fire/auth';
import { Observable, BehaviorSubject, filter, map } from 'rxjs';
import { CentralService } from './central.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated = false;
  userID: string | undefined;
  private auth: Auth = inject(Auth);
  private isAuthenticatedSubject = new BehaviorSubject<boolean | null>(null);

  constructor(
    private route:Router,
    private crud:CrudService,
    private central:CentralService
  ) { 
    this.initAuthListen();
   }

  signUpWithEmailPw(infos: {email:string, password:string}, firstName:string): void {
    createUserWithEmailAndPassword(this.auth, infos.email, infos.password).then(
      res => {
        let memberID = res.user.uid;
        let path = `Portfolios/${memberID}`;
        let body = {
          id: memberID,
          firstName: firstName,
          email: infos.email,
          hasFinishedOnboarding: false,
          currentOnboardingStep: 1
        }
        this.crud.create('set', path, body).then(
          res => {
            // It will be disabled on the next page, onboarding
            this.central.enableLoader();
            this.redirectToOnboarding();
          },
          err => {
            alert('An error occured, please retry or contact me on 𝕏 @YuuAsAService. Sorry for this ! 🧑🏻‍🚀');
          }
        )
      },
      err => {
        // Disable loader when error is thrown
        this.central.disableLoader();
        console.error(err);
      }
    )
  }

  signInWithEmailPw(infos: {email:string, password:string}): void {
    signInWithEmailAndPassword(this.auth, infos.email, infos.password).then(
      res => {
        let memberID = res.user.uid;
        let path = `Portfolios/${memberID}/hasFinishedOnboarding`;
        this.crud.read('object', path).then(
          res => {
            let hasFinishedOnboarding = res;
            // It will be disabled on the next page, onboarding or dashboard
            this.central.enableLoader();
            if(hasFinishedOnboarding){
              this.redirectToDashboard();
            } else {
              this.redirectToOnboarding();
            }
          }
        )
      },
      err => {
        // Disable loader when error is thrown
        this.central.disableLoader();
        console.error(err);
        if(err.code == 'auth/invalid-credential') alert('Your email or your password is incorrect. If you forgot your password, you can reset it.')
        if(err.code == 'auth/too-many-requests') alert('Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later..')
      }
    )
  }

  initAuthListen(): void {
    onAuthStateChanged(this.auth, (user) => {
      const authenticated = !!user;
      this.isAuthenticatedSubject.next(authenticated);
      console.log("AuthService - Auth status:", authenticated);
      if (user) {
        console.log("Member is authenticated. Member details:", user.uid);
        this.setUserID(user.uid);
      } else {
        console.log("Member is not authenticated");
      }
    }, (error) => {
      console.error(error);
    });
  }

  isUserAuthorized(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable().pipe(
      filter(val => val !== null),
      map(val => val as boolean) // Convertir en `boolean` car nous avons filtré `null`
    );
  }

  getUserID(): string | undefined {
    if(!!this.userID){
      return this.userID
    } else {
      return undefined
    }
  }

  async hasUserFinishedOnboarding(): Promise<boolean> {
    let path = `Portfolios/${this.userID}/hasFinishedOnboarding`
    let hasFinished = await this.crud.read('object',path);
    return hasFinished;
  }

  async sendResetPwEmail(email: string): Promise<boolean> {
    try {
      await sendPasswordResetEmail(this.auth, email);
      return Promise.resolve(true);
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async confirmPwReset(obbCode:string, newPassword:string): Promise<boolean> {
    try {
      await confirmPasswordReset(this.auth, obbCode, newPassword);
      return Promise.resolve(true);
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  

  async logout(): Promise<boolean> {
    try {
      // It will be disabled on the next page, auth
      this.central.enableLoader();
      await signOut(this.auth);
      this.redirectToSignIn();
      return Promise.resolve(true);
    } catch (err) {
      // Disable loader when error is thrown
      this.central.disableLoader();
      console.error(err);
      throw err;
    }
  }

  private setUserID(uid:string): void {
    this.userID = uid;
    this.isAuthenticated = true;
  }

  private redirectToOnboarding(): void {
    this.route.navigate(['onboarding']);
  }

  private redirectToDashboard(): void {
    this.route.navigate(['dashboard']);
  }

  private redirectToSignIn(): void {
    this.route.navigate(['auth/sign-in']);
  }

}
