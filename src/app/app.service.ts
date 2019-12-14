import { Injectable } from '@angular/core';
import {  Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

private url ='https://chatapi.edwisor.com';

  constructor( public http:HttpClient, public cookie:CookieService) { }//end of constructor

public getUserInfoFromLocalStorage = () =>{

  return JSON.parse(localStorage.getItem('user Info'));
}// end getUserInfoFromLocalstorage

  public setUserInfoInLocalStorage = (data) => {

  localStorage.setItem('user Info', JSON.stringify(data))  
  }// end setUserInfoInLocalStorage

  public signupFunction(data): Observable <any>{

    const params = new HttpParams()
    .set ('firstName', data.firstName)
    .set ('lastName', data.lastName)
    .set ('mobile', data.mobile)
    .set ('email',data.email)
    .set('password', data.password)
    .set('apiKey', data.apiKey);

    return this.http.post(`${this.url}/api/v1/users/signup`, params);
  
  }// end of singupFunction function

  public signinFunction(data): Observable<any> {

    const params = new HttpParams()

    .set('email',data.email)
    .set('password',data.password);

  return this.http.post(`${this.url}/api/v1/users/login`, params)

   }// end of signinFiunction function

  private handleError(err:HttpErrorResponse){

    let errorMessage='';

    if (err.error instanceof Error ){

      errorMessage=`An error occurred: ${err.error.message}`;
    
    }else {

      errorMessage =`Server retured code: ${err.status}, error message is: ${err.message}`;

    }// end condition *if

    console.error(errorMessage);

    return Observable.throw(errorMessage);
    
  }// END handleError

}
