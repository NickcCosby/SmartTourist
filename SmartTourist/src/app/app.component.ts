import { Component } from '@angular/core';
import { UserService } from './user.service';

import { PlacesService } from './places.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SmartTourist';
  constructor(public auth: UserService){
    auth.handleAuthentication();
  }
}
