import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public auth: UserService) { }

  ngOnInit() {
  }

  login() {
    console.log("you clicked the log in button!")
    this.auth.login();
  }

}
