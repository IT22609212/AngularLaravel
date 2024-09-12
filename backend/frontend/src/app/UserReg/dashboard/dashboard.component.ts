import { Component, OnInit } from '@angular/core';
import { User } from '../../user';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
import { Product } from '../../product';
import { ProductService } from '../../home/product.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
 
  products:Product[]=[];
  cart: any[] = [];
  id!:Number


  constructor(public authService:AuthServiceService,private router:Router,public productService:ProductService,private route:ActivatedRoute){}
  ngOnInit(): void {
    console.log(this.products);

    // Fetch all products
    this.productService.getAllProducts().subscribe({
      next: (data: Product[]) => {
        this.products = data;
        console.log('Products:', this.products);
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      }
    });
  }
  // onSubmit(){
  //   this.authService.logout();
  //   this.router.navigateByUrl('/UserReg/register');
  //   console.log('Dude you are Logout!!');
    
 
  
  deletePost(id: Number) {
    


        this.productService.delete(id).subscribe((res)=>{
          this.products =this.products.filter(item=>item.id!==id)   //from filtering check if deleted id is coming if not save to posts
        console.log('Post Deleted Successfully!')
        })
            error: (err: any) => {
                console.error('Error deleting post:', err);
                alert('Failed to delete post. Please try again later.');
            }
    };
    

    addToFavorites(product: Product) {
      // Implement logic to add product to favorites
      console.log('Added to favorites:', product);
    }
  
    addToCart(product: Product) {
      // Implement logic to add product to cart
      console.log('Added to cart:', product);
    }
  
    buyNow(product: Product) {
      this.id  = +this.route.snapshot.params['userId']

      const userId = this.authService.find(this.id);
      if(product && userId){
        let userCart = JSON.parse(localStorage.getItem(`cart_${userId}`)||'[]' ) ;

        
      userCart.push(product)
      localStorage.setItem(`cart_${userId}`,JSON.stringify(userCart))
      console.log('Product added to cart for user:', userId);
      this.router.navigateByUrl('Payment/:productId/cart');
      }

    }
    
    
}




