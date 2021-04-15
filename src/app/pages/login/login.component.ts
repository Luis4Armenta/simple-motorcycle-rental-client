import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginForm } from 'src/app/interfaces/login-form';
import { AuthService } from 'src/app/services/auth-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: LoginForm = {
    email: '',
    password: ''
  }
  constructor(
    private _authService: AuthService,
    private _router: Router
    ) { }

  login() {
    this._authService.login(this.loginForm).subscribe(res => {
      localStorage.setItem('token', res.accessToken);
      localStorage.setItem('username', res.user);

      this.loginForm = {
        email: '',
        password: ''
      };

      this._router.navigate(['/rent']);
    });
  }

}
