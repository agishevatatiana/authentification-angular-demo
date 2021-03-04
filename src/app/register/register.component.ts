import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AuthService } from '../auth.service';

@UntilDestroy()
@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup = new FormGroup({});
    emailControl: FormControl = new FormControl(null);
    passwordControl: FormControl = new FormControl(null);
    private registerUserData: any = {};

    constructor(
        private auth: AuthService,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        this.emailControl = new FormControl(null, [Validators.required, Validators.email]);
        this.passwordControl = new FormControl(null, [Validators.required]);

        this.registerForm.addControl('email', this.emailControl);
        this.registerForm.addControl('password', this.passwordControl);
    }

    changeUserData(): void {
        const controls = (this.registerForm || {}).controls;
        if (!controls || !controls.email || !controls.password) {
            console.error('Submit Error: Controls are undefined');
            return;
        }
        const email = controls.email.value;
        const password = controls.password.value;
        this.registerUserData = {email, password};
    }

    registerUser(): void {
        this.auth.registerUser(this.registerUserData)
            .pipe(untilDestroyed(this))
            .subscribe(res => {
                localStorage.setItem('token', res.token);
                this.router.navigate(['/special']);
            });
    }
}
