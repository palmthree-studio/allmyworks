import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import memberstackDOM from "@memberstack/dom";
const memberstack = memberstackDOM.init({
  publicKey: "pk_sb_1c398999cea7c0955968",
});

@Injectable({
  providedIn: 'root'
})
export class MemberstackService {

  private isAuthenticated = false;
  userID: string | undefined;

  constructor(
    private route:Router
  ) { 
    this.initAuthListener();
   }

  signUpWithEmailPw(infos: {email:string, password:string}): void {
    let emailPassword = infos;
    memberstack.signupMemberEmailPassword(emailPassword).then(
      res => {
        // save user in database
        this.redirectToOnboarding();
      },
      err => {
        console.error(err);
      }
    )
  }

  signInWithEmailPw(infos: {email:string, password:string}): void {
    let emailPassword = infos;
    memberstack.loginMemberEmailPassword(emailPassword).then(
      res => {
        // verify if user has finished his onboarding
        let hasFinishedOnboarding = true; // or false
        if(hasFinishedOnboarding){
          this.redirectToDashboard();
        } else {
          this.redirectToOnboarding();
        }
      },
      err => {
        console.error(err);
      }
    )
  }

  async sendResetPwEmail(email: string): Promise<string> {
    let mail = { email };
    try {
      const res = await memberstack.sendMemberResetPasswordEmail(mail);
      return res.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async resetPw(infos: {token:string, newPassword:string}): Promise<boolean> {
    try {
      const res = await memberstack.resetMemberPassword(infos);
      return res.data.success;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  logout(): void {
    memberstack.logout();
  }

  private initAuthListener(): void {
    memberstack.onAuthChange((member: any) => {
      this.isAuthenticated = !!member;
      if (member) {
        console.log("Member is authenticated. Member details:", member);
        this.getUserID();
      } else {
        console.log("Member is not authenticated");
      }
    });
  }

  isUserAuthorized(): boolean {
    return this.isAuthenticated;
  }

  private async getUserID(): Promise<string> {
    try {
      const res = await memberstack.getCurrentMember();
      return res.data.id;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  private redirectToOnboarding(): void {
    this.route.navigate(['onboarding']);
  }

  private redirectToDashboard(): void {
    this.route.navigate(['dashboard']);
  }

}
