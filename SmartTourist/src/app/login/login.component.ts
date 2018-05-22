import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  location="";

  getLocation() {
    function showPosition(position) {
      console.log("HERE")
      this.location = "Latitude: " + position.coords.latitude + 
      "<br>Longitude: " + position.coords.longitude;
    }

    if (navigator.geolocation) {
      console.log("WHAT")
      console.log(navigator.geolocation.getCurrentPosition);
    } else { 
      this.location = "Geolocation is not supported by this browser.";
    }

    console.log("?")
  }

  
}
