import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from "@angular/forms";

import { RouterModule, Routes } from '@angular/router';

import { LoginFormComponent } from './login-form/login-form.component';
import { EmailRegistrationComponent } from './email-registration/email-registration.component';
import { PhoneVerificationComponent } from './phone-verification/phone-verification.component';
import { FillProfileComponent } from './fill-profile/fill-profile.component';

import { MatProgressBarModule } from '@angular/material/progress-bar';
import {UserService} from "./user.service";



const routes: Routes = [
  { path: 'login', component: LoginFormComponent },
  { path: 'registration', component: EmailRegistrationComponent },
  { path: 'phone-verification', component: PhoneVerificationComponent},
  { path: 'fill-profile', component: FillProfileComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', component: LoginFormComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    EmailRegistrationComponent,
    PhoneVerificationComponent,
    FillProfileComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
    UserService,
  ],
  bootstrap: [AppComponent],

})
export class AppModule { }
