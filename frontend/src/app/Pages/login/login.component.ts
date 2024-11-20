import { Component } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    standalone: false
})
export class LoginComponent {


  email:string='';
  password:string='';
constructor (private authService: AuthService,private router: Router){}
onSubmit(){
  const userData = {
    email: this.email,
    password: this.password,
  };
this.authService.login(userData).subscribe(
  {
    next: (response) => {
      console.log('Login successful:', response);
      
       this.router.navigate(['/']);
       localStorage.setItem('token', response.token);
       localStorage.setItem('user', JSON.stringify(response.data));
       localStorage.setItem('role', JSON.stringify(response.role));
    },
    error: (error) => {
      console.error('Error during login:',error.error.non_field_errors[0]);
      alert('Login failed!');
    }
  }
);


}}
