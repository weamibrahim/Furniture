import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false
})
export class AppComponent implements OnInit {
  title = 'Furniture';
  isloading = true

  constructor(private router: Router) {}

  ngOnInit(): void {

    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.isloading = true;
      } else if (event instanceof NavigationEnd) {
        setTimeout(() => {
          this.isloading = false;
        }, 1000);
      }
    });
  }


  }
