import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ButtonComponent } from 'src/app/shared/ui/button/button.component';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  standalone: true,
    imports: [
        ReactiveFormsModule,
        FormsModule,
        NgIf,
        ButtonComponent,
        RouterLink
    ]
})
export class SigninComponent implements OnInit {

  signInForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService:AuthService
    ) {}

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  signIn(): void {
    let infos = {
      email: this.signInForm.get('email')?.value,
      password: this.signInForm.get('password')?.value
    }
    this.authService.signInWithEmailPw(infos);
  }

}
