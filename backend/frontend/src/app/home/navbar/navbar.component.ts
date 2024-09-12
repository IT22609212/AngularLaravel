import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthServiceService } from '../../UserReg/auth-service.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  id!:number;

  constructor(public authService:AuthServiceService,private router:Router,private route:ActivatedRoute){}

  ngOnInit(): void {
    
  }

  logout(){
    this.id  = +this.route.snapshot.params['userId']

    const userId = this.authService.find(this.id);
    this.authService.logout().subscribe((res) => {
      console.log(res);
    });
    localStorage.removeItem('token');
    localStorage.removeItem(`cart_${userId}`); 
    this.router.navigate(['/']);
  }

  
  

}
