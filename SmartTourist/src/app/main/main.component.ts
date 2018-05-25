import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../places.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { MapTypeStyle } from '@agm/core';


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
  useMap: boolean;
  iconUrl= {
    amusement_park: 
    {
      url: 'https://image.flaticon.com/icons/svg/188/188383.svg',
      scaledSize: {
        height: 40,
        width: 40
      }
    },
    aquarium: 
    {
      url: 'https://image.flaticon.com/icons/svg/870/870383.svg',
      scaledSize: {
        height: 40,
        width: 40
      }
    },
    art_gallery:
    {
      url: 'https://www.flaticon.com/premium-icon/icons/svg/524/524280.svg',
      scaledSize: {
        height: 40,
        width: 40
      }
    },
    campground: 
    {
      url: 'https://image.flaticon.com/icons/svg/883/883290.svg',
      scaledSize: {
        height: 40,
        width: 40
      }
    },
    casino: 
    {
      url: 'https://image.flaticon.com/icons/svg/827/827214.svg',
      scaledSize: {
        height: 40,
        width: 40
      }
    },
    park: 
    {
      url: 'https://image.flaticon.com/icons/svg/896/896008.svg',
      scaledSize: {
        height: 40,
        width: 40
      }
    },
    library: 
    {
      url: 'https://image.flaticon.com/icons/svg/831/831433.svg',
      scaledSize: {
        height: 40,
        width: 40
      }
    },
    movie_theater: 
    {
      url: 'https://image.flaticon.com/icons/svg/3/3655.svg',
      scaledSize: {
        height: 40,
        width: 40
      }
    },
    museum: 
    {
      url: 'https://image.flaticon.com/icons/png/512/8/8154.png',
      scaledSize: {
        height: 40,
        width: 40
      }
    },
    night_club: 
    {
      url: 'https://image.flaticon.com/icons/svg/923/923984.svg',
      scaledSize: {
        height: 40,
        width: 40
      }
    },
  } 

  constructor(private _route: ActivatedRoute, private router: Router, private placesservice: PlacesService, private authService: UserService) { }

  ngOnInit() {
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

  addPlace(placeId){
    let observable = this.authService.addPlace(this.user.sub, placeId);
    observable.subscribe(data => {
      console.log("the data from adding place is", data)
    })
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

  // onVisited(place){
  //   //add to user db user.seen update this.user

  //   this.placesservice.removeSeen(this.places, this.user)
  // }
  
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
