import { Component } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import {  Router } from '@angular/router';
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    standalone: false
})
export class HeaderComponent {
  isAuthenticated: boolean;
  isAdmin: boolean;
  constructor(private authService: AuthService,private router:Router) {
    this.isAdmin=this.authService.isAdmin();
    this.isAuthenticated = this.authService.isAuthenticated();
  }

  logout() {
    this.authService.logout();
    this.isAuthenticated = false;
    this.router.navigate(['/login']);
    localStorage.clear();


  }



}
