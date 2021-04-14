import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginForm } from 'src/app/interfaces/login-form';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: LoginForm = {
    email: '',
    password: ''
  }
  constructor(
    private _authService: AuthServiceService,
    private _router: Router
    ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    window.location.reload();
  }

  login() {
    this._authService.login(this.loginForm).subscribe(res => {
      console.log(res.accessToken, 'respuesta del server')
      localStorage.setItem('token', res.accessToken)
      localStorage.setItem('username', res.user)

      this.loginForm = {
        email: '',
        password: ''
      }

      this,this._router.navigate(['/rent'])
    })
  }

}
