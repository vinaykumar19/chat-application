import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
//routing
import { RouterModule,Routes} from '@angular/router';
import { ChatModule } from './chat/chat.module';
import { UserModule } from './user/user.module';
import { LoginComponent } from './user/login/login.component';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AppService } from './app.service';
import { CookieService } from 'ngx-cookie-service';
import { RemoveSpecialCharPipe } from './shared/pipe/remove-special-char.pipe';


@NgModule({
  declarations: [
    AppComponent,
    RemoveSpecialCharPipe
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    ChatModule,
    UserModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot([
       { path: 'login', component:LoginComponent, pathMatch:'full' },
       { path: '', redirectTo:'login',pathMatch:'full' },
       { path: '*', component:LoginComponent },
       { path: '**', component:LoginComponent }
       

    ])
  ],
  providers: [AppService,CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
