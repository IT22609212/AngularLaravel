import { Component, OnInit } from '@angular/core';
import { Product } from '../../product';
import { ProductService } from '../product.service';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-product',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {
  id!: number;
  products!: Product;

  constructor(
    public productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.params['productId']; // Ensure id is a number
    this.productService.find(this.id).subscribe((pdata: Product) => {
      this.products = pdata;
    });
  }

  getImageUrl(imageFilename: string): string {
    const baseUrl = 'http://127.0.0.1:8000/storage/products/';
    return `${baseUrl}${imageFilename}`;
  }
}
