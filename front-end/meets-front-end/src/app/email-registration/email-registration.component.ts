import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../user.service";

@Component({
  selector: 'app-email-registration',
  templateUrl: './email-registration.component.html',
  styleUrls: ['./email-registration.component.css',
              '../../assets/css/login-registration.css']
})
export class EmailRegistrationComponent implements OnInit {

  registrationWith = 'email';

  email = null;
  password = null;
  phone = null;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService) { }

  changeRegistrationType($event) {
    this.registrationWith = $event.target.value;
    console.log(this.registrationWith);
  }

  nextStep($event) {
    if (this.registrationWith === 'phone') {
      this.router.navigate(['/phone-verification'])
    } else {
      console.log(this.userService.user);
      this.userService.user.email = this.email;
      this.userService.user.password = this.password;
      this.router.navigate(['/fill-profile'])
    }

  }

  ngOnInit() {
  }

}
