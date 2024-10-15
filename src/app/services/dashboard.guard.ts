import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, CanLoad, CanMatch, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardGuard implements CanActivate{
  
  constructor(
    private router: Router,
    private auth: AuthService,
    private activeRoute: ActivatedRoute,
  ) { }

  canActivate(): boolean {
    console.log(this.activeRoute);
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(["/login"]);
      return false;
    }
    // return false;
    return true;
  }
}
