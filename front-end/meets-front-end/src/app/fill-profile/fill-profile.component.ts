import { Component, OnInit } from '@angular/core';
import { UserService} from "../user.service";

@Component({
  selector: 'app-fill-profile',
  templateUrl: './fill-profile.component.html',
  styleUrls: ['./fill-profile.component.css',
              '../../assets/css/login-registration.css']
})
export class FillProfileComponent implements OnInit {
  totalSteps = 6;
  step = 1;
  progress = (this.step*100)/this.totalSteps;
  file = "../../assets/images/male.png";

  user = {
    gender: null,
    location: null,
    date_of_birth: null,
    name: null,
    phone_code: null,
    phone_number: null,
    photo: null,
    password: null,
    email: null
  };

  dd($event) {
    console.log(this.file);
    console.log(this.userService.user);
  }

  changeGender($event) {
    this.user.gender = $event.target.value;
  }

  nextStep() {
    this.step = this.step + 1;
    this.progress = (this.step*100)/this.totalSteps;
  }

  register($event){
    console.log({...this.userService.user});
    this.userService.user.email = this.user.email;
    this.userService.user.gender = this.user.gender;
    this.userService.user.name = this.user.name;
    console.log({...this.userService.user});
    this.userService.user.location = this.user.location;
    this.userService.user.date_of_birth = this.user.date_of_birth;
    this.userService.user.phone_number = this.user.phone_code + this.user.phone_number;
    this.userService.user.photo = this.user.photo;
    this.userService.user.password = this.user.password;

    this.userService.postUser(this.userService.user);
  }

  handleFileInput(files: FileList) {
    let file = files.item(0);
    console.log(this.file);
    let reader: FileReader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event: Event) => {
      this.user.photo = reader.result;
      this.file = reader.result;
    }

  }

  constructor(private userService:UserService) {
    this.nextStep = this.nextStep.bind(this);
  }

  ngOnInit() {
  }

}
