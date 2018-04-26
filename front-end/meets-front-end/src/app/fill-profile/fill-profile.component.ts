import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fill-profile',
  templateUrl: './fill-profile.component.html',
  styleUrls: ['./fill-profile.component.css',
              '../../assets/css/login-registration.css']
})
export class FillProfileComponent implements OnInit {
  totalSteps = 6;
  step = 1;
  gender = '';
  progress = (this.step*100)/this.totalSteps;
  imgPath = "../../assets/images/male.png";

  aa() {
    return this.imgPath;
  }

  dd($event) {
    console.log(this.imgPath);
  }

  changeGender($event) {
    this.gender = $event.target.value;
  }

  nextStep() {
    console.log(this.progress);
    this.step = this.step + 1;
    this.progress = (this.step*100)/this.totalSteps;
    console.log(this.progress)
  }



  constructor() {
    this.nextStep = this.nextStep.bind(this);
  }

  ngOnInit() {
  }

}
