import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css',
              '../../assets/css/login-registration.css']
})


export class LoginFormComponent implements OnInit {

  loginType = 'email';

  changeLoginType($event) {
    console.log($event.target.value);
    this.loginType = $event.target.value;
  }

  constructor( private route: ActivatedRoute,
               private router: Router) { }

  ngOnInit() {
  }

  onRegister($event) {
    this.router.navigate(['/registration'])
  }

}
