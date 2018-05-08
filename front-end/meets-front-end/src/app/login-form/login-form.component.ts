import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute } from "@angular/router";
import {UserService} from "../user.service";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css',
              '../../assets/css/login-registration.css']
})


export class LoginFormComponent implements OnInit {

  loginType = 'email';

  email = null;
  password = null;
  phone = null;

  changeLoginType($event) {
    console.log($event.target.value);
    this.loginType = $event.target.value;
  }

  constructor( private route: ActivatedRoute,
               private router: Router,
               private userService: UserService) { }

  ngOnInit() {
  }

  login() {
    if (this.loginType === 'email') {
      console.log('login with email and password', this.email, this.password);
      this.userService.user.email = this.email;
      this.userService.user.password = this.password;

      this.userService.loginWithEmail(this.userService.user);
    } else {
      console.log('login with phone', this.phone);
    }
  };

  onRegister($event) {
    this.router.navigate(['/registration'])
  }

}
