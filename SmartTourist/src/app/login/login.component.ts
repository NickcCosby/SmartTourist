import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public auth: UserService) { }

  ngOnInit() {
  }

  // login() {
  //   console.log("you clicked the log in button!")
  //   this.auth.login();
  // }

  // location="";

  // getLocation() {
  //   function showPosition(position) {
  //     console.log("HERE")
  //     this.location = "Latitude: " + position.coords.latitude + 
  //     "<br>Longitude: " + position.coords.longitude;
  //   }

  //   if (navigator.geolocation) {
  //     console.log("WHAT")
  //     console.log(navigator.geolocation.getCurrentPosition);
  //   } else { 
  //     this.location = "Geolocation is not supported by this browser.";
  //   }

  //   console.log("?")
  // }

  
}
