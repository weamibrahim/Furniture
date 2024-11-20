import { Component } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
    selector: 'app-update-profile',
    templateUrl: './update-profile.component.html',
    styleUrls: ['./update-profile.component.css'],
    standalone: false
})
export class UpdateProfileComponent {

  constructor(private authService: AuthService) { }
  user =JSON.parse(localStorage.getItem('user') || '{}');
  updateProfile() {
    const updatedData = {
        username: this.user.username,
        email: this.user.email,
    };

    this.authService.updateProfile(updatedData).subscribe({
        next: (response) => {
            console.log('Profile updated successfully:', response);
            localStorage.setItem('user', JSON.stringify(response.user));
        },
        error: (error) => {
            console.error('Error updating profile:', error);
        },
    });
}



}
