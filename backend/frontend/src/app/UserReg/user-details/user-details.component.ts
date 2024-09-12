import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
import { User } from '../../user';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [RouterLink,FormsModule,CommonModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent implements OnInit {

  users:User[]=[]

  constructor(public authService:AuthServiceService){}

  ngOnInit(): void {
    this.authService.getAll().subscribe({
      next: (data: User[]) => {
        this.users = data;
        console.log(this.users);
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      }
    });
    
  }
  

  deletePost(id: Number) {
    this.authService.delete(id).subscribe((res)=>{
      this.users =this.users.filter(item=>item.id!==id)   //from filtering check if deleted id is coming if not save to posts
    console.log('Post Deleted Successfully!')
    })
        error: (err: any) => {
            console.error('Error deleting post:', err);
            alert('Failed to delete post. Please try again later.');
        }
      }

}
