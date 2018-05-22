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

  constructor(private _route: ActivatedRoute, private placesservice: PlacesService) { }

  ngOnInit() {
    this.ShowAll(1000);
  }

  ShowAll(range){
    this.placesservice.setRange(range);
    this.placesservice.getNearby(data => {
      this.places = data;
      console.log("Places ",this.places)
    });
  }



}
