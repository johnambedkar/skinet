import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountService } from 'src/app/account/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private accountService: AccountService, private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot, // the route that is trying to be activated.
    state: RouterStateSnapshot) // current router state to find out where the user is coming from.
    : Observable<boolean> // we can return an observable of boolean. we need to return if the user is logged in.
    {
      // router is going to subscribe and unsubscribe for us. so we don't need to subscribe here.
      return this.accountService.currentUser$.pipe(
        map(auth => {
          if(auth){
            return true;
          }
          this.router.navigate(['account/login'], {queryParams: {returnUrl: state.url}});
        })
      );
    }
}
