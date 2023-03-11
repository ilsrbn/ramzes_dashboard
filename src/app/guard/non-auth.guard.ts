import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../shared/auth.service';
@Injectable({
  providedIn: 'root'
})
export class NonAuthGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}
  canActivate(): boolean {
    if (this.auth.isAuthenticated()) {
      this.router.navigateByUrl('/app/photos');
      return false;
    }
    return true;
  }
}
