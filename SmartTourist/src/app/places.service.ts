import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private apiKey: string;
  private range: number;
  private location: any;
  constructor(private _http: HttpClient) 
  {  
    this.apiKey = "AIzaSyAMUDBCHuBqiqYw15QSvN1JF43Cw6QIUaI";
  }
  setRange(_range:number)
  {
    this.range = _range;
  }
  async getNearby(callback:Function)
  {
    await this.getLocation();
    if(this.location == undefined)
    {
      return callback(null);
    }
    const whitelist = ['amusement_park', 'museum' , 'aquarium', 'zoo', 'park', 'art_gallery', 'casino', 
    'night_club', 'stadium','library', 'movie_theater', 'campground'];
    let params :{location:string, radius:string, key:string, rankby:string, pagetoken:string, type:string} = 
    {
      location:this.location.coords.latitude + "," + this.location.coords.longitude,
      radius:this.range.toString(),
      key:this.apiKey,
      rankby:"prominence",
      pagetoken:undefined,
      type:whitelist[0]
    };
    var all = [];
    var callCount = 0;
    var errGot = false;
    try{
      for(let newType of whitelist)
      {
        params.type = newType;
        await new Promise((resolve, reject)=>this._http.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json?" + "key=" + params.key +  
        "&location=" + params.location + "&radius=" + params.radius + "&rankby=" + params.rankby + "&type=" + params.type
          ).subscribe(resolve))
        .then((result:any)=>{
          var data = result.results;
          if(data.length != 0)
          {
            for(let iii in data)
            {
              if(data[iii].opening_hours != undefined)
              {
                if(data[iii].opening_hours.open_now === false)
                {
                  data.splice(iii, 1);
                  continue;
                }
              }
              data[iii].distance = this.getDistance([{lat:this.location.coords.latitude, long:this.location.coords.longitude}, {lat: data[iii].geometry.location.lat, long: data[iii].geometry.location.lng}]);
            }  
            all.push(data);
            callCount++
         }
        }).catch((err)=>{console.log(err); errGot = true;});
      }
    }
    catch
    {
      console.error("bombed out during while loop");
      return null;
    }
    callback(all);
  }
  async getLocation()
  {
    await this.getPosition().then((position)=>{this.location=position;});
  }
  async getPosition()
  {
    if(navigator.geolocation)
    {
      return new Promise((resolve, reject)=>{navigator.geolocation.getCurrentPosition(resolve, reject)});
    }
    else
    {
      this.location = null;
    }
  }
  getDistance(point: [{lat:number, long:number}, {lat:number, long:number}]) : number
  {
    var R = 6371; // Radius of the earth in km
    var dLat = (point[1].lat - point[0].lat) * Math.PI / 180;  // deg2rad below
    var dLon = (point[1].long - point[0].long) * Math.PI / 180;
    var a = 
      0.5 - Math.cos(dLat)/2 + 
      Math.cos(point[0].lat * Math.PI / 180) * Math.cos(point[1].lat * Math.PI / 180) * 
      (1 - Math.cos(dLon))/2;

    var distance =  R * 2 * Math.asin(Math.sqrt(a));
    //convert to miles
    var miles = distance * 0.62137
    //prettify
    miles = Math.floor(miles*10)/10;
    return miles
  }
  removeSeen(places, user)
  {
    for(let iii = 0; iii < places.length; iii++)
    {
      for(let zzz = 0; zzz < places[iii].length; zzz++)
      {
        if(user.seen.includes(places[iii][zzz].place_id))
        {
          places[iii].splice(zzz,1);
        }
      }
    }
  }
  removeRange(places, newRange)
  {
    for(let iii = 0; iii < places.length; iii++)
    {
      for(let zzz = 0; zzz < places[iii].length; zzz++)
      {
        if(places[iii][zzz].distance > newRange)
        {
          places[iii].splice(zzz, 1);
        }
      }
    }
  }
  
}
