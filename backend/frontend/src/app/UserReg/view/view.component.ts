import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../user';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'] // Corrected from styleUrl to styleUrls
})
export class ViewComponent implements OnInit {
  user?: User; // Changed from ! to ? to handle undefined cases
  id!: number;

  constructor(
    public authService: AuthServiceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.params['userId'];

    if (isNaN(this.id)) {
      console.error('Invalid userId parameter:', this.id);
      return; // Early exit if id is invalid
    }

    this.authService.find(this.id).subscribe(
      (data: User) => {
        this.user = data;
      },
      (error) => {
        console.error('Error fetching user:', error);
      }
    );
  }
}
