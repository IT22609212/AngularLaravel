import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  UserName: string = '';
  email: string = '';

  constructor(public authService: AuthServiceService) { }

  ngOnInit(): void {
    this.loadUserFromToken();
  }

  loadUserFromToken(): void {
    const tokenString = localStorage.getItem('token');
    if (tokenString) {
      // Handle the token as a plain string or decode if necessary
      console.log('Token:', tokenString);

      this.authService.getUserProfile().subscribe(
        userProfile => {
          console.log('User Profile Data:', userProfile); // Log the data
          this.UserName = userProfile.user.name;
          this.email = userProfile.user.email;
        },
        error => {
          console.error('Error fetching user profile:', error);
        }
      );
      
       
    } else {
      console.log('No token found');
    }
  }
  getInitial(name: string): string {
    if (name) {
      return name.charAt(0).toUpperCase();
    }
    return '';
  }

  onUpdate(): void {
    const updatedData = { name: this.UserName, email: this.email };
    this.authService.updateUserProfile(updatedData).subscribe(
      response => {
        console.log('User profile updated successfully');
      },
      error => {
        console.log('Error updating user profile', error);
      }
    );
  }

  onDelete(): void {
    this.authService.delete(this.UserName).subscribe(
      response => {
        console.log('User profile deleted successfully');
        this.authService.logout();
      },
      error => {
        console.log('Error deleting user profile', error);
      }
    );
  }

  onLogout(): void {
    this.authService.logout();
    console.log('Logged out successfully!');
  }
}
