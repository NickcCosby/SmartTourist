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
  currentFilter: any;
  filter: any;
  map: any;
  useMap: boolean

  constructor(private _route: ActivatedRoute, private router: Router, private placesservice: PlacesService, private authService: UserService) { }

  ngOnInit() {
    console.log("the localstorage in the main is ", localStorage)
    this.useMap = true;
    if(!localStorage['access_token']){
      console.log("not logged in!")
      this.router.navigate(['/']);
    }
    else{
      console.log("you are logged in ");
      this.user = this.authService.getProfile();
      console.log(this.user);   
    }
    this.filter = {type: "all", range: 0.6};
    this.currentRange = this.filter.range;
    this.currentFilter = this.filter.type;
    this.ShowAll(this.filter.range, this.filter.type);
  }

  ShowAll(range, filter){
    this.placesservice.setRange(range);
    this.placesservice.getNearby(data => {
      this.places = data;
      console.log(this.places)
      this.map = {
        lat:this.placesservice.location.coords.latitude,
        long:this.placesservice.location.coords.longitude,
        zoom:15,
      }
      if(filter !== "all"){
        var splice=[];
        for(let x=0; x<this.places.length; x++){
          var match = false;
          for(let z=0; z<this.places[x][0].types.length; z++){
            if(this.places[x][0].types[z] === this.filter['type']){
              match = true;
              continue;
            }
          }
          if(match !== true){
            splice.push(x)
          }
        }
        for(let s=splice.length-1; 0<=s; s--){
          this.places.splice(splice[s],1);       
        }
      }
      if(this.places[0] == undefined){
        console.log("ARRAY EMPTIED")
        this.places = undefined;
      }
    });
  }

  onVisited(place){
    //add to user db user.seen update this.user

    this.placesservice.removeSeen(this.places, this.user)
  }
  
  onFilter(){
    console.log(this.filter)
    console.log("Current Places",this.places)
    if(this.filter['range'] < this.currentRange){
      this.placesservice.removeRange(this.places, this.filter['range']);
      if(this.filter['type'] !== "all"){
        this.currentFilter = this.filter['type'];
        var splice=[];
        for(let x=0; x<this.places.length; x++){
          var match = false;
          for(let z=0; z<this.places[x][0].types.length; z++){
            if(this.places[x][0].types[z] === this.filter['type']){
              match = true;
              continue;
            }
          }
          if(match !== true){
            splice.push(x)
          }
        }
        for(let s=splice.length-1; 0<=s; s--){
          this.places.splice(splice[s],1);       
        }
      }
      if(this.places[0] == undefined){
        console.log("ARRAY EMPTIED")
        this.places = undefined; 
      }
    }

    else if(this.filter['range'] > this.currentRange){
      this.ShowAll(this.filter['range'], this.filter['type']);
    }
    this.currentRange = this.filter['range'];

    if(this.filter['range'] === this.currentRange && this.filter['type'] !== "all"){
      this.currentFilter = this.filter['type'];
      var splice=[];
      for(let x=0; x<this.places.length; x++){
        var match = false;
        for(let z=0; z<this.places[x][0].types.length; z++){
          if(this.places[x][0].types[z] === this.filter['type']){
            match = true;
            continue;
          }
        }
        if(match !== true){
          splice.push(x)
        }
      }
      for(let s=splice.length-1; 0<=s; s--){
        this.places.splice(splice[s],1);       
      }
      if(this.places[0] == undefined){
      console.log("ARRAY EMPTIED")
      this.places = undefined;
      }
    }

    if(this.currentFilter !== "all" || this.currentFilter !== this.filter.type){
      this.ShowAll(this.filter['range'], this.filter['type']);
    }

  }

}
