import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isLogin: boolean = !!localStorage.getItem('token');

  constructor(
    private readonly _authService: AuthService,
    private _router: Router
    ) {
      this._authService.getLoggedIn.subscribe(((value: boolean) => {
        this.isLogin = value;
      }));
    }

  logOut() {
    this._authService.logOut();
  }

  register() {
    this._router.navigate(['/register']);

  }

  login() {
    this._router.navigate(['/login']);
  }
}
