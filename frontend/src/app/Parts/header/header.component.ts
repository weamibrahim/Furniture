import { Component ,OnInit} from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import {  Router } from '@angular/router';
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    standalone: false
})
export class HeaderComponent implements OnInit{
  isAuthenticated: boolean;
  isAdmin: boolean;
  constructor(private authService: AuthService,private router:Router) {
    this.isAdmin=this.authService.isAdmin();
    this.isAuthenticated = this.authService.isAuthenticated();
  }

  ngOnInit() {
    this.isAuthenticated = !!localStorage.getItem('token');

    this.router.events.subscribe(() => {
      this.isAuthenticated = !!localStorage.getItem('token');
    });
  }
  logout() {
    this.authService.logout();
    this.isAuthenticated = false;
    this.router.navigate(['/login']);
    localStorage.clear();


  }



}
