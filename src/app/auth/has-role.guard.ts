import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HasRoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router, public snackBar: MatSnackBar) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


      return this.authService.user.pipe(
        take(1),
        map(userH => {
            console.log(userH.role.role);
            console.log(route.data['role']);
            if (route.data['role'].includes(userH.role.role)) {
                return true;
            }

            this.snackBar.open('Nemate pravo pristupa ovoj stranici!', 'U redu', {
              duration: 4500
            });
            return this.router.createUrlTree(['/film']);
        }));

  }
}