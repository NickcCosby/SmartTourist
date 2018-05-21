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
    const whitelist = ['amusement_park', 'aquarium', 'library', 'art_gallery', 'movie_theater', 'museum', 
      'cafe', 'campground', 'night_club', 'painter', 'park', 'casino', 'spa', 'stadium', 'zoo'];
    let params :{location:string, radius:string, key:string, rankby:string, pagetoken:string} = 
    {
      location:this.location.coords.latitude + "," + this.location.coords.longitude,
      radius:this.range.toString(),
      key:this.apiKey,
      rankby:"prominence",
      pagetoken:null
    };
    var all = [];
    var callCount = 0;
    var errGot = false;
    try{
      while(all.length < 30 && !errGot)
      {
        console.log("https://maps.googleapis.com/maps/api/place/nearbysearch/json?" + 
        (params.pagetoken == null?"location=" + params.location + "&radius=" + params.radius + "&rankby=" + params.rankby:
        "pagetoken="+params.pagetoken) + "&key=" + params.key);
        await new Promise((resolve, reject)=>this._http.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json?" + 
          (params.pagetoken == null?"location=" + params.location + "&radius=" + params.radius + "&rankby=" + params.rankby:
          "pagetoken="+params.pagetoken) + "&key=" + params.key
          ).subscribe(resolve))
        .then((result:any)=>{
          var data = result.results;
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
            if(!data[iii].types.some(element=>{return whitelist.includes(element)}))
            {
              data.splice(iii, 1);
              continue;
            }
            data[iii].distance = this.getDistance([{lat:this.location.coords.latitude, long:this.location.coords.longitude}, {lat: data.geometry.location.lat, long: data.geometry.location.lng}]);
          }  
          all = all.concat(data);
          console.log(result);
          params.pagetoken = result.next_page_token;
          callCount++
        }).catch((err)=>{console.log(err); errGot = true;});
      }
    }
    catch
    {
      console.error("bombed out during while loop");
      return null;
    }
    console.log(all);
    console.log(callCount);
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
  getDistance(point: [{lat:number, long:number}, {lat:number, long:number}])
  {
    var R = 6371; // Radius of the earth in km
    var dLat = (point[1].lat - point[0].lat) * Math.PI / 180;  // deg2rad below
    var dLon = (point[1].long - point[0].long) * Math.PI / 180;
    var a = 
      0.5 - Math.cos(dLat)/2 + 
      Math.cos(point[0].lat * Math.PI / 180) * Math.cos(point[1].lat * Math.PI / 180) * 
      (1 - Math.cos(dLon))/2;

    return R * 2 * Math.asin(Math.sqrt(a));
  }
}
