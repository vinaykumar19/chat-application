import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class ChatRouteGuardService implements CanActivate {

  constructor( private router:Router, private cookie:CookieService) { }

canActivate(route:ActivatedRouteSnapshot):boolean{
  console.log("in guard service");
  if (this.cookie.get('authToken')===undefined || this.cookie.get('authToken')=== '' || this.cookie.get('authToken')=== null){
    this.router.navigate(['/']);
    return false;

  } else{
    return true;
  }
}

}
