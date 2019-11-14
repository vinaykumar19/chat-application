import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AppService } from 'src/app/app.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

     public email:any;
     public password:any;

  constructor( public appService:AppService, public router:Router, private toastr:ToastrService, private cookie:CookieService ) { }

  ngOnInit() {}

  public goToSignUp:any = ()=>{

    this.router.navigate(['/sign-up']);
  }// end goToSingUp

  public signinFunction:any=()=>{

    if(!this.email){

      this.toastr.warning('enter email')
    
    }else if(!this.password){
   
      this.toastr.warning('enter password')

    }else {

      let data ={

        email:this.email,
        password:this.password
      }

      this.appService.signinFunction(data).subscribe((apiResponse)=>{

            if (apiResponse.status===200){

              console.log(apiResponse)
            
            this.cookie.set('authtoken',apiResponse.data.authToken);

            this.cookie.set('receiverId',apiResponse.data.userDetails.userId);
           
            this.cookie.set('receiverName',apiResponse.data.userDetails.firstName+ ' ' + apiResponse.data.userDetails.lastName);
           
            this.appService.setUserInfoInLocalStorage(apiResponse.data.userDetails);
           
            this.router.navigate(['/chat']);

            }else{
              this.toastr.error(apiResponse.message)
            }
      },(err) => {
        this.toastr.error('some error occured')
      }
      )

    }
  
  }
}
