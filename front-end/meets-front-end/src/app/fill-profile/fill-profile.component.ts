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
  file = "../../assets/images/male.png";

  dd($event) {
    console.log(this.file);
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

  handleFileInput(files: FileList) {
    let file = files.item(0);
    console.log(this.file);
    let reader: FileReader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event: Event) => {
      this.file = reader.result;
    }

  }

  constructor() {
    this.nextStep = this.nextStep.bind(this);
  }

  ngOnInit() {
  }

}
