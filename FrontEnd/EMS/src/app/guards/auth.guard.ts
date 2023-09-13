import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NgToastModule, NgToastService } from 'ng-angular-popup';

@Injectable({
  providedIn: 'root'
})
class PermissionsService {

  constructor(private router: Router, private auth: AuthService, private toast: NgToastService) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      if(this.auth.isLoggedIn()){
        return true
      }else{
        this.toast.error({detail:"ERROR",summary:"Login to access dashboard!"})
        this.router.navigate(['login'])
        return false
      }
  }
}

export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(PermissionsService).canActivate(next, state);
}