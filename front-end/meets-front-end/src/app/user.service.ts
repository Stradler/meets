import { Injectable } from '@angular/core';
import { User } from "./user";
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs/Observable";

import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';
import {logWarnings} from "protractor/built/driverProviders";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

const PORT = 3000;

const BASE_URL = `http://localhost:${PORT}`;

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  user = new User();

  private usersUrl = 'http://localhost:3000/users';

  postUser(newUser): void {console.log(`${BASE_URL}/users`);
  console.log(newUser);
    var formData = new FormData();
    formData.append('photo', newUser.photo);
    formData.append('data', JSON.stringify(newUser));
    this.http.post (`${BASE_URL}/users`, formData)
      .subscribe(
        data => {console.log(data);},
        err=> console.log(err));
  }

}
