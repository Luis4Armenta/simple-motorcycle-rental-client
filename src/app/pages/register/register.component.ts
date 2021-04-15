import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterForm } from 'src/app/interfaces/register-form';
import { AuthService } from 'src/app/services/auth-service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: RegisterForm = {
    name: '',
    email: '',
    password: ''
  }
  constructor(
    private _authService: AuthService,
    private _router: Router
    ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    // window.location.reload();
  }

  register() {
    this._authService.register(this.registerForm).subscribe(res => {
      this.registerForm = {
        name: '',
        email: '',
        password: ''
      }
      this._router.navigate(['login'])
    })
  }
}
