import { Component, OnInit } from '@angular/core';

import { PlacesService } from './places.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  constructor(private placesService: PlacesService){}
  ngOnInit()
  {
    this.placesService.setRange(5000);
    this.placesService.getNearby(data=>{});
  }
}
