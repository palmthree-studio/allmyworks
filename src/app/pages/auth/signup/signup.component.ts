import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { ButtonComponent } from "../../../shared/ui/button/button.component";
import { CrudService } from 'src/app/shared/services/crud.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    standalone: true,
    imports: [
        ReactiveFormsModule,
        FormsModule,
        NgIf,
        ButtonComponent,
        RouterLink
    ]
})
export class SignupComponent implements OnInit {

  signUpForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService:AuthService,
    private crudService:CrudService
    ) {}

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      name: ['', [Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.passwordValidator]],
      confirmPw: ['', Validators.required]
    }, { validators: this.matchPasswords('password', 'confirmPw') });
  }

  passwordValidator(control: AbstractControl): { [key: string]: any } | null {
    const password = control.value;
    if (!password) {
      return null;
    }
    const isValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
    return isValid ? null : { invalidPassword: true };
  }
  

  matchPasswords(password: string, confirmPassword: string): ValidatorFn {
    return (group: AbstractControl): { [key: string]: any } | null => {
      let pass = group.get(password)?.value;
      let confirmPass = group.get(confirmPassword)?.value;
      return pass === confirmPass ? null : { notSame: true };
    }
  }

  createAccount(): void {
    let infos = {
      email: this.signUpForm.get('email')?.value,
      password: this.signUpForm.get('password')?.value
    }
    let firstName = this.signUpForm.get('name')?.value;
    this.authService.signUpWithEmailPw(infos,firstName);
  }

}
