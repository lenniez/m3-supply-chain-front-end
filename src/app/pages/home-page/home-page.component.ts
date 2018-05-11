import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    
    // smooth scroll from get started button to product category list on homepage - fix this later
    // const smoothScroll = () => {
    //   $('#get-started-btn').click(() => {
    //     $('html, body').animate({
    //       scrollTop: $('#get-started-smooth-scroll').offset().top
    //     }, 800);
    //   });
    // };

    // window.addEventListener('load', smoothScroll());
  }

}
