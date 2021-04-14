import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../services/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {
  constructor(private _authService: AuthServiceService, private _router: Router) { }
  canActivate() {
    if (!this._authService.loggedIn()) {
      return true
    } else {
      this._router.navigate(['/rent']);
      return false
    }
  }
  
}
