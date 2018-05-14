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

  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = false;
  separatorKeysCodes = [ENTER, COMMA];
  interestControl = new FormControl();
  filteredInterests: Observable<any[]>;

  selectedInterests = [];
  interests = [];

  @ViewChild('interestInput') interestInput: ElementRef;

  constructor(private userService:UserService) {
    this.filteredInterests = this.interestControl.valueChanges.pipe(
      startWith(null),
      map((interest: string | null) => interest ? this.filter(interest) : this.interests.slice()));
  }

  add(event: MatChipInputEvent): void {

    const input = event.input;
    const value = event.value;
        // Add our fruit
    if ((value || '').trim()) {
      this.selectedInterests.push({ name: value.trim() });
      console.log(value);
    }
    if (input) {
      input.value = '';
    }
  }

  remove(interest: any): void {
    const index = this.selectedInterests.indexOf(interest);

    if (index >= 0) {
      this.selectedInterests.splice(index, 1);
    }
  }

  filter(name: string) {
    return this.interests.filter(interest =>
      interest.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedInterests.push({ name: event.option.viewValue });
    console.log(event.option.viewValue);
    this.interestInput.nativeElement.value = '';
  }

  userData = {};

  languages = new FormControl([1,2,3]);
  languageList = [];
  bodyTypeList = [];
  eyeColorList = [];
  hairColorList = [];
  smokingList = [];
  drinkingList = [];
  aboutMe = '';



  height = null;
  weight = null;
  selectedBodyType = null;
  selectedEyeColor = null;
  selectedHairColor = null;
  smoking = null;
  drinking = null;

  log = () => {
    console.log(this.selectedInterests,this.languages.value, this.aboutMe,this.userService.user);
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
          this.interests = data.interest;
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
