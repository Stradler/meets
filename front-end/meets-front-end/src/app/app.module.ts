import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { RouterModule, Routes } from '@angular/router';

import { LoginFormComponent } from './login-form/login-form.component';
import { EmailRegistrationComponent } from './email-registration/email-registration.component';
import { PhoneVerificationComponent } from './phone-verification/phone-verification.component';
import { FillProfileComponent } from './fill-profile/fill-profile.component';

import { MatProgressBarModule } from '@angular/material/progress-bar';
import {UserService} from "./user.service";
import { ProfileEditComponent } from './profile-edit/profile-edit.component';

import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

const routes: Routes = [
  { path: 'login', component: LoginFormComponent },
  { path: 'registration', component: EmailRegistrationComponent },
  { path: 'phone-verification', component: PhoneVerificationComponent},
  { path: 'fill-profile', component: FillProfileComponent },
  { path: 'edit-profile', component: ProfileEditComponent },
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
    ProfileEditComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
    UserService,
  ],
  bootstrap: [AppComponent],

})
export class AppModule { }
