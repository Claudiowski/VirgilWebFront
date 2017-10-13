import { NgModule }             from '@angular/core';
import { FormsModule }          from '@angular/forms';
import { HttpModule }           from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }     from './app.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component'

import { LoginComponent }   from './authentication/login/login.component';
import { LoginService }     from './authentication/login/login.service';

import { AppRoutingModule } from './app-routing.module';

import { CanActivateViaAuthGuard } from './authentication/activation';
import { AuthService } from './authentication/auth.service';

import { ConsultModule } from './pages/consult/consult.module'

import { ManageModule } from './pages/manage/manage.module'

import { ReviewModule } from './pages/review/review.module'

import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ConsultModule,
    ManageModule,
    AppRoutingModule,
    ReviewModule
  ],
  providers: [
    CanActivateViaAuthGuard,
    AuthService,
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
