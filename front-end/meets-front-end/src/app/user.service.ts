import { Injectable } from '@angular/core';
import { User } from "./user";
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs/Observable";

import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';
import {logWarnings} from "protractor/built/driverProviders";

const httpOptions = {
  headers: new HttpHeaders({
    'id': '44'
  })
};

const PORT = 3000;

const BASE_URL = `http://localhost:${PORT}`;

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  user = new User();

  private usersUrl = 'http://localhost:3000/users';

  loginWithEmail(userLoginData) {
    console.log(userLoginData);
    this.http.post(`${BASE_URL}/login`,userLoginData)
      .subscribe(
        data => {
          console.log(data);
          localStorage.setItem('access-token', JSON.stringify(data));
          },
        error => { console.log(error);},
      )
  }

  postUser(newUser): void {console.log(`${BASE_URL}/users`);
  console.log(newUser);
    let formData = new FormData();
    formData.append('photo', newUser.photo);
    formData.append('data', JSON.stringify(newUser));
    this.http.post (`${BASE_URL}/users`, formData)
      .subscribe(
        data => {
          console.log(data);
          },
        err => {
          console.log(err)
        });
  }

  getUserInfo(): Observable<any> {
    return this.http.get(`${BASE_URL}/users/edit-profile`, httpOptions);
  }

  getInputsData(): Observable<any> {
    return this.http.get(`${BASE_URL}/users/inputs-data`);
  }

}
