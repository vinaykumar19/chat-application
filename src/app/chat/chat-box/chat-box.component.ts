import { Component, OnInit } from '@angular/core';
import {SocketService} from './../../socket.service';
import {AppService} from './../../app.service';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css'],
  providers:[SocketService]
})
export class ChatBoxComponent implements OnInit {
           
  public authToken:any;
  public userInfo:any;
  public receiverId:any;
  public receiverName:any;
  public userList:any=[];
  public disconnectedSocket:boolean;

  constructor( public appService:AppService, public socketService:SocketService, public router:Router, private toastr:ToastrService, private cookie:CookieService)  {

        this.receiverId=cookie.get('receiverId');
        this.receiverName= cookie.get('receiverName');


   }

  ngOnInit() {
  
  this.authToken = this.cookie.get('authtoken');
  this.userInfo = this.appService.getUserInfoFromLocalStorage();
  this.checkStatus();
  this.verifyUserConfirmation();
  this.getOnlineUserList();
  }
 
  public checkStatus:any=()=>{
    if (this.cookie.get('authtoken')===undefined || this.cookie.get('authtoken')==='' || this.cookie.get('authtoken')===null){

      this.router.navigate(['/']);
      return false;
    }else {
      return true;
    }
  }// end checkStatus

  public verifyUserConfirmation:any=()=>{

    this.socketService.verifyUser().subscribe((data)=>{

      this.disconnectedSocket=false;
      this.socketService.setUser(this.authToken);
      this.getOnlineUserList()
    });
  }

  public getOnlineUserList:any=()=>{

    this.socketService.onlineUserList().subscribe((userList)=>{
      this.userList=[];
      for(let x in userList){
        let temp={ 'userId':x,'name':userList[x],'unread':0,'chatting':false};
        this.userList.push(temp);
      }
      console.log(this.userList);
    });// end online-user-list
  }

}
