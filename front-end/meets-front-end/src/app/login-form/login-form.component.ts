import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})


export class LoginFormComponent implements OnInit {

  loginType = 'email';

  changeLoginType($event) {
    console.log($event.target.value);
    this.loginType = $event.target.value;
  }

  constructor() { }

  ngOnInit() {
  }

}
