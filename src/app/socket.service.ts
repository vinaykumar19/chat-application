import { Injectable } from '@angular/core';


import * as io from 'socket.io-client';
import {Observable,throwError, of} from 'rxjs';
import { catchError, tap} from 'rxjs/operators';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { HttpErrorResponse, HttpParams} from '@angular/common/http';
import { CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private url ='http://chatapi.edwisor.com';
  private socket;
  
  constructor(public http:HttpClient, public cookie: CookieService) { 

    //connection is being created
    // that handshake
    this.socket = io(this.url)
  }

 // events to be listened
public verifyUser = () =>{

  return Observable.create((observer)=>{
    this.socket.on('verifyUser',(data)=>{
      observer.next(data);
    });// end Socket
  }); // end observable
} // end verifyUser

public onlineUserList=()=>{
  return Observable.create((observer)=>{
    this.socket.on('online-user-list',(userList)=>{
      observer.next(userList);
    }); // end Socket
  }); // end observable
} // end onlineUserList

public disconnectedSocket=()=>{
  return Observable.create((observer)=>{
    this.socket.on('disconnect',()=>{
      observer.next();
    }); // end Socket
  }); // end observable
} // end disconnectSocket

// end events to be listened

// events to be emitted

public setUser = (authToken)=>{
  this.socket.emit('set-user',authToken);
}// end setUser
// events to be emitted

public chatByUserId = (userId) => {

  return Observable.create((observer)=> {

    this.socket.on(userId, (data) => {

      observer.next(data);

    }); //end Socket

  }); //end observable

} //end chatByUserId

public SendChatMessage=(chatMsgObject)=>{

  this.socket.emit('chat-msg',chatMsgObject);

} //end getChatMessage

public markChatAsSeen =(userDetails)=>{
  this.socket.emit('mark-chat-as-seen',userDetails);
}

public getChat( senderId, receiverId, skip ): Observable<any>{

  return this.http.get(`${this.url}/api/v1/chat/get/for/user?senderId=${senderId} & receiverId = ${receiverId} & skip=${skip} & authToken = ${this.cookie.get('authToken')}`)
  .pipe(
    tap(data=>console.log('Data Received')),catchError(this.handleError))

}

public exitSocket=()=>{
  this.socket.disconnect();
}

private handleError(err:HttpErrorResponse){
  let errorMessage='';
  if(err.error instanceof Error){
    errorMessage=`An error occurred: ${err.error.message}`;
    
  }else {
  
  errorMessage=`Server returned code: ${err.status}, error message is: ${err.message}`
  }
 console.error(errorMessage);
 return Observable.throw(errorMessage);
 }// end handleError



}
