import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../places.service';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private _route: ActivatedRoute, private placesservice: PlacesService) { }

  ngOnInit() {
    this.filter = {type: "all", range: 0.6};
    this.currentRange = 0.6
    this.ShowAll(this.currentRange);
  }

  ShowAll(range){
    this.placesservice.setRange(range);
    this.placesservice.getNearby(data => {
      this.places = data;
      console.log("Places ",this.places)
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
