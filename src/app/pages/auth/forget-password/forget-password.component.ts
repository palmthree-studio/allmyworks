import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ButtonComponent } from 'src/app/shared/ui/button/button.component';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
  standalone: true,
  imports: [
      ReactiveFormsModule,
      FormsModule,
      NgIf,
      ButtonComponent,
      RouterLink
  ]
})
export class ForgetPasswordComponent implements OnInit {

  forgotForm!: FormGroup;
  mailIsSent = false;

  constructor(
    private fb: FormBuilder,
    private auth:AuthService
    ) {}

  ngOnInit(): void {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  forget(): void {
    this.auth.sendResetPwEmail(this.forgotForm.get('email')?.value).then(
      mailIsSent =>{
         this.mailIsSent = mailIsSent;
      },
      err =>{
        if(err.code === 'auth/invalid-email') alert('This email doesn\'t exist.')
      }
    )
  }

}
