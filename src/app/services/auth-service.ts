import { EventEmitter, Injectable, Output } from '@angular/core';
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
  @Output() getLoggedIn: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  login(data: LoginForm): Observable<AuthResponse> {
    this.getLoggedIn.emit(true);
    return this.http.post<AuthResponse>(`${this.URL}/login`, data);
  }

  register(data: RegisterForm): Observable<boolean> {
    return this.http.post<boolean>(`${this.URL}/register`, data);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  loggedIn(): boolean {
    if (!!localStorage.getItem('token')) this.getLoggedIn.emit(true);
    return !!localStorage.getItem('token')
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    window.location.reload();
    this.getLoggedIn.emit(false)
  }
}
