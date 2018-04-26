import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-email-registration',
  templateUrl: './email-registration.component.html',
  styleUrls: ['./email-registration.component.css',
              '../../assets/css/login-registration.css']
})
export class EmailRegistrationComponent implements OnInit {

  registrationWith = 'email';

  constructor(private route: ActivatedRoute,
              private router: Router) { }

  changeRegistrationType($event) {
    this.registrationWith = $event.target.value;
    console.log(this.registrationWith);
  }

  nextStep($event) {
    if (this.registrationWith === 'phone') {
      this.router.navigate(['/phone-verification'])
    } else {
      this.router.navigate(['/fill-profile'])
    }

  }

  ngOnInit() {
  }

}
