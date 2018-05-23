import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../places.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  user: any;
  places: any;
  currentRange: any;
  filter: any;
  map: any;
  useMap: boolean

  constructor(private _route: ActivatedRoute, private router: Router, private placesservice: PlacesService, private authService: UserService) { }

  ngOnInit() {
    this.useMap = true;
    if(this.authService.getProfile() === undefined){
      console.log("not logged in!")
      this.router.navigate(['/']);
    }
    else{
      console.log("you are logged in ");
      this.user = this.authService.getProfile();
      console.log(this.user);   
    }
    this.filter = {type: "all", range: 0.6};
    this.currentRange = 0.6
    this.ShowAll(this.currentRange);
  }

  ShowAll(range){
    this.placesservice.setRange(range);
    this.placesservice.getNearby(data => {
      this.places = data;
      console.log("Places ",this.places);
      this.map = {
        lat:this.placesservice.location.coords.latitude,
        long:this.placesservice.location.coords.longitude,
        zoom:15,
      }
    });
  }

  onVisited(place){
    //add to user db user.seen update this.user

    this.placesservice.removeSeen(this.places, this.user)
  }
  
  onFilter(){
    console.log(this.filter)
    if(this.filter['type'] !== "all"){
      //make array of arrays only array of one type array
      // this.placesservice.filterType(this.filter['type'])
      console.log("not all");
    }
    if(this.filter['range'] < this.currentRange){
      this.placesservice.removeRange(this.places, this.filter['range']);
    }
    else if(this.filter['range'] > this.currentRange){
      this.ShowAll(this.filter['range']);
    }
    this.currentRange = this.filter['range'];    
  }

}
