import { Component } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService,private router:Router) {}

  onSubmit() {
    const userData = {
      username: this.username,
      email: this.email,
      password: this.password,
    };

    this.authService.register(userData).subscribe(
      {
        next: (response) => {
          console.log('Registration successful:', response);
          
          this.router.navigate(['/login']);

      },
      error: (error) => {
        console.error('Error during registration:', error);
        alert('Registration failed!');
      }
    }
    );
  }
}

