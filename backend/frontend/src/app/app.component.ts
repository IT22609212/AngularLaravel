import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { RegisterComponent } from "./UserReg/register/register.component";
import { DashboardComponent } from './UserReg/dashboard/dashboard.component';
import { NavbarComponent } from "./home/navbar/navbar.component";
import { FooterComponent } from "./home/footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RegisterComponent, DashboardComponent, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'login-app';
}
