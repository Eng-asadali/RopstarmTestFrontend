import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(public auth: AuthService, public router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
           
        let is_authenticated;
        let key = route.queryParams.key;
        
        // if (key != undefined && key == 12) {
        //     is_authenticated = true
        // }
        // else {
            if (this.auth.isAuthenticated())
                is_authenticated = true;
            else {
                this.router.navigate(['/']);
                is_authenticated = false;
            }

//        }
        // console.log(is_authenticated);
        return is_authenticated;

    }
}