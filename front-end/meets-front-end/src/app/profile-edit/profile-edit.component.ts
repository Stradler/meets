import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import {FormControl} from '@angular/forms';


import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {ElementRef, ViewChild} from '@angular/core';
import {MatAutocompleteSelectedEvent, MatChipInputEvent} from '@angular/material';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {UserService} from "../user.service";

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ProfileEditComponent implements OnInit {

  @ViewChild('interestInput') interestInput: ElementRef;

  constructor(private userService:UserService) {}

  userData = {};
  userLanguages = [];
  userInterests = [];
  languages = new FormControl();
  interests = new FormControl();
  interestList = [];
  languageList = [];
  bodyTypeList = [];
  eyeColorList = [];
  hairColorList = [];
  smokingList = [];
  drinkingList = [];



  height = null;
  weight = null;
  selectedBodyType = null;
  selectedEyeColor = null;
  selectedHairColor = null;
  smoking = null;
  drinking = null;

  findInterestById = (id) => {
    const interest = this.interestList.find(interest => interest.id === id);
    return interest ? interest.name : '';
  };
  log = () => {
    console.log(
      this.userData
    );

    this.userService.user.height = this.height;
    this.userService.user.weight = this.weight;
    this.userService.user.bodyType = this.selectedBodyType;
    this.userService.user.eyeColor = this.selectedEyeColor;
    this.userService.user.hairColor = this.selectedHairColor;
    this.userService.user.smoking = this.smoking;
    this.userService.user.drinking = this.drinking;
  };

  ngOnInit() {
    this.userService.getInputsData()
      .subscribe(
        data => {
          console.log(data);
          this.interestList = data.interest;
          this.languageList = data.language;
          this.bodyTypeList = data.body_type;
          this.eyeColorList = data.eye_color;
          this.hairColorList = data.hair_color;
          this.smokingList = data.drinking_and_smoking;
          this.drinkingList = data.drinking_and_smoking;
          this.userService.getUserInfo()
            .subscribe(
              data => {
                console.log(data);
                this.userData = data;

                this.userLanguages = this.userData.languages.map(lang => lang.id);
                this.languages = new FormControl(this.userLanguages);

                this.userInterests = this.userData.interests.map(inter => inter.id);
                this.interests = new FormControl(this.userInterests);

              },
              error => {
                console.log(error);
              }
            )
        },
        error => {
          console.log(error);
        }
      )
  }

}
