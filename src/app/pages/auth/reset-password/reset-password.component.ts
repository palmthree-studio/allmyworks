import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
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
      ButtonComponent,
      RouterLink
  ]
})
export class ResetPasswordComponent {

  resetForm!: FormGroup;
  obbCode = '';
  pwIsReset = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private route:ActivatedRoute
    ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.obbCode = params['oobCode'];
      console.log(this.obbCode);
    });
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

  confirmNewPW(): void {
    this.auth.confirmPwReset(this.obbCode, this.resetForm.get('password')?.value).then(
      success => {
        this.pwIsReset = success;
      },
      err => {
        console.error(err);
      }
    )
  }

}
