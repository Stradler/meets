import { Component, OnInit } from '@angular/core';

import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-phone-verification',
  templateUrl: './phone-verification.component.html',
  styleUrls: ['./phone-verification.component.css',
              '../../assets/css/login-registration.css']
})
export class PhoneVerificationComponent implements OnInit {

  timer = 5;

  startTimer() {
    let interval = setInterval(()=> {
      this.timer--;
      if (this.timer === 0) {
        clearInterval(interval);
      }}, 1000)
  }

  reSend($event) {
    this.timer = 15;
    this.startTimer();
  }

  nextStep($event) {
    this.router.navigate(['/fill-profile'])
  }
  constructor(private route: ActivatedRoute,
              private router: Router) {
    this.startTimer = this.startTimer.bind(this)
  }

  ngOnInit() {
    this.startTimer();
  }

}
