import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthResponse } from '../interfaces/auth-response';
import { RegisterForm } from '../interfaces/register-form';
import { LoginForm } from '../interfaces/login-form';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';




@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private URL = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  login(data: LoginForm): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.URL}/login`, data);
  }

  register(data: RegisterForm): Observable<boolean> {
    return this.http.post<boolean>(`${this.URL}/register`, data)
  }

  getToken() {
    return localStorage.getItem('token');
  }

  loggedIn(): boolean {
    return !!localStorage.getItem('token')
  }
}
