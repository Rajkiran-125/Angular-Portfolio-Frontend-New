import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(
    private router: Router,
    private auth: AuthService,
    private activeRoute: ActivatedRoute
) { }
  canActivate(): boolean {
    if (!this.auth.isNotLoggedIn()) {
      this.router.navigate([""]);
      return false;
  }
  return this.auth.isNotLoggedIn();
  }
  
}
