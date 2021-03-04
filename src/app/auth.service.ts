import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
    private registerUrl = 'http://localhost:3000/api/register';
    private loginUrl = 'http://localhost:3000/api/login';

    constructor(
        private http: HttpClient,
        private router: Router) {
    }

    registerUser(user: any): Observable<any> {
        return this.http.post<any>(this.registerUrl, user);
    }

    loginUser(user: any): Observable<any> {
        return this.http.post<any>(this.loginUrl, user);
    }

    logoutUser(): void {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
    }

    loggedIn(): boolean {
        console.log(localStorage.getItem('token'));
        return !!localStorage.getItem('token');
    }

    get getToken(): string | null {
        return localStorage.getItem('token');
    }
}
