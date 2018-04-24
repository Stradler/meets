import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule,  } from '@angular/common/http';

import { RouterModule, Routes } from '@angular/router';

import { LoginFormComponent } from './login-form/login-form.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
  ],
  bootstrap: [AppComponent],

})
export class AppModule { }
