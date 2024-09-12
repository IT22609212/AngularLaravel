import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../home/product.service';
import { Product } from '../../product';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from '../payment.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthServiceService } from '../../UserReg/auth-service.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
 
  cartItems: any[] = [];
  products!:Product;
  id!:number;

  constructor(public authService:AuthServiceService,private route:ActivatedRoute) {}

  ngOnInit(): void {
    // this.loadCart();
    this.id  = +this.route.snapshot.params['userId']

    const userId = this.authService.find(this.id);
    if(userId){
      const savedCart = localStorage.getItem(`cart_${userId}`)
    if (savedCart) {
      this.cartItems = JSON.parse(savedCart);
    }
    }
    
  }

  // // Load cart items
  // loadCart() {
  //   this.cartService.getCart().subscribe(
  //     (items) => this.cartItems = items,
  //     (error) => console.error('Error loading cart', error)
  //   );
  // }

  // // Update item quantity
  // updateQuantity(cartItemId: number, quantity: number) {
  //   this.cartService.updateCartQuantity(cartItemId, quantity).subscribe(
  //     () => this.loadCart(),
  //     (error) => console.error('Error updating quantity', error)
  //   );
  // }

  // // Remove item from cart
  // removeFromCart(cartItemId: number) {
  //   this.cartService.removeFromCart(cartItemId).subscribe(
  //     () => this.loadCart(),
  //     (error) => console.error('Error removing item', error)
  //   );
  // }


  // getImageUrl(imageFilename: string): string {
  //   const baseUrl = 'http://127.0.0.1:8000/storage/products/';
  //   return `${baseUrl}${imageFilename}`;
  // }
  removeFromCart(productId: number): void {
    this.cartItems = this.cartItems.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }





}
