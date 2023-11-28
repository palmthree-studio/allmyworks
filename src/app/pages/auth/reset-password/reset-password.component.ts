import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { ButtonComponent } from 'src/app/shared/ui/button/button.component';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  standalone: true,
  imports: [
      ReactiveFormsModule,
      FormsModule,
      NgIf,
      ButtonComponent
  ]
})
export class ResetPasswordComponent {

  resetForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.resetForm = this.fb.group({
        password: ['', [Validators.required, this.passwordValidator]],
        confirmPw: ['', Validators.required]
      }, { validators: this.matchPasswords('password', 'confirmPw') 
    });
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

}
