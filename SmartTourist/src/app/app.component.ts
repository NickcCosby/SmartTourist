import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';

import { PlacesService } from './places.service';
import { RequiredValidator } from '@angular/forms';

declare var require: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SmartTourist';
  logoImageUrl = require("./InkedsmartTourist_LI.jpg");
  constructor(public auth: UserService){
  }

  OnInit(){
    
  }

}
