import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AuthService } from '../auth.service';

@UntilDestroy()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  emailControl: FormControl = new FormControl(null);
  passwordControl: FormControl = new FormControl(null);
  private loginUserData: any = {};

  constructor(
      private auth: AuthService,
      private router: Router
  ) {
  }

  ngOnInit(): void {
    console.log('login');
    this.emailControl = new FormControl(null, [Validators.required, Validators.email]);
    this.passwordControl = new FormControl(null, [Validators.required]);

    this.loginForm.addControl('email', this.emailControl);
    this.loginForm.addControl('password', this.passwordControl);
  }

  changeUserData(): void {
    const controls = (this.loginForm || {}).controls;
    if (!controls || !controls.email || !controls.password) {
      console.error('Submit Error: Controls are undefined');
      return;
    }
    const email = controls.email.value;
    const password = controls.password.value;
    this.loginUserData = {email, password};
  }

  loginUser(): void {
    this.auth.loginUser(this.loginUserData)
        .pipe(untilDestroyed(this))
        .subscribe(res => {
          localStorage.setItem('token', res.token);
          this.router.navigate(['/special']);
        });
  }

}
