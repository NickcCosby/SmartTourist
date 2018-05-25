import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import * as anime from 'animejs';
import * as $ from 'jquery';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public auth: UserService) { }

  ngOnInit() {
    $('.logged').hide();
    $('.ml3').hide();

    $('.ml1').hide();

    this.auth.logout();
    setTimeout(func => {
      this.animate();
    }, 1000)
    
    setTimeout(func => {
      this.animate_quote();
    }, 4000)
    
  }

  animate() {
    $('.logged').hide();
    $('.ml1').show();
    $('.ml1 .letters').each(function(){
      $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
    });


    anime.timeline({loop: false})
      .add({
        targets: '.ml1 .letter',
        opacity: [0,1],
        easing: "easeInOutQuad",
        duration: 2250,
        delay: function(el, i) {
          return 150 * (i+1)
        }
      }).add({
        targets: '.ml1 .line',
        scaleX: [0,1],
        opacity: [0.5,1],
        easing: "easeOutExpo",
        duration: 1000,
        offset: '-=875',
        delay: function(el, i, l) {
          return 80 * (l - i);
        }
      });
    
    }
   
    animate_quote(){

      $('.ml3').show();
      $('.ml3').each(function(){
        $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
      });
      
      anime.timeline({loop: false})
        .add({
          targets: '.ml3 .letter',
          opacity: [0,1],
          easing: "easeInOutQuad",
          duration: 2250,
          delay: function(el, i) {
            return 150 * (i+1)
          }
        });
      $('.logged').fadeIn(8000);
    }
}
