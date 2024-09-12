import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../product.service';
import { Product } from '../../product';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-addproduct',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,FormsModule],
  templateUrl: './addproduct.component.html',
  styleUrl: './addproduct.component.css'
})
export class AddproductComponent implements OnInit {

  quantity!:number;
  product!:Product;
  ProductForm!:FormGroup
  imagePreview: string = '';
  selectedItemImage: File = new File([], '');
  itemData:any={}

  constructor(public productService:ProductService,private router:Router,
    private dialog:MatSnackBar
  ){
  }

 ngOnInit(): void {
  this.ProductForm = new FormGroup({
    product_name: new FormControl('', [Validators.required]), // Match with 'product_name'
    quantity: new FormControl('', [Validators.required, Validators.min(0)]),
    price: new FormControl('', [Validators.required, Validators.min(0)]), // Match with 'price'
    product_desc: new FormControl(''), // Match with 'product_desc'
    image_url: new FormControl('') // Optional, match with 'image_url' if used
  });
}


OnSubmit() {
  if (this.ProductForm.valid) {
    const formData = new FormData();
    formData.append('product_name', this.ProductForm.get('product_name')?.value);
    formData.append('quantity', this.ProductForm.get('quantity')?.value);
    formData.append('price', this.ProductForm.get('price')?.value);
    formData.append('product_desc', this.ProductForm.get('product_desc')?.value);

    // Append the image if available
    if (this.selectedItemImage) {
      formData.append('image_url', this.selectedItemImage);
    }

    this.productService.addProduct(formData).subscribe({
      next: (data: any) => {
        console.log('Product added successfully!', data);
        console.log(formData.get('image_url'));

        this.dialog.open('Product Added Successfully!', '', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
          panelClass: ['custom-snackbar']
        });
        this.router.navigateByUrl('UserReg/dashboard');
      },
      error: (error: any) => {
        console.error('Error occurred:', error);
      }
    });
  }
}


  


  get f(){
    return this.ProductForm.controls;
  }

  onImageChange(event: any): void {
    const input = event.target.files[0];
  
    if (input) {
      this.selectedItemImage = input;
      const reader = new FileReader();
      
      reader.onload = () => {
        this.imagePreview = reader.result as string; // Display preview
      };
  
      reader.readAsDataURL(input); // Read file as data URL for preview
    }
  }
  

  imagePreviewbase64Image(img: any): string | undefined {
    if (img) {
      const format = this.detectFileType(img);
      if (format == 'image') {
        const base64String = img.replace(/^data:image\/\w+;base64,/, '');

        try {
          // Check if the base64 string has valid padding
          const isValidBase64 = /^[A-Za-z0-9+/]*={0,2}$/.test(base64String);
          if (!isValidBase64) {
            throw new Error(
              'Invalid base64 string (missing or incorrect padding)'
            );
          }

          // Decode base64 string to binary data
          const binaryData = atob(base64String);

          // Convert binary data to a Uint8Array
          const arrayBuffer = new Uint8Array(
            new ArrayBuffer(binaryData.length)
          );
          for (let i = 0; i < binaryData.length; i++) {
            arrayBuffer[i] = binaryData.charCodeAt(i);
          }

          // Create a Blob from Uint8Array
          const blob = new Blob([arrayBuffer]);

          // Create a data URL from the Blob
          const decodedImageUrl = URL.createObjectURL(blob);

          // Set the decoded image URL to be used in an image tag or elsewhere
          return decodedImageUrl;
        } catch (error) {
          return 'assets/img/no-images.png';
        }
      } 
       else {
        return 'assets/img/no-images.png';
      }
    }

    // Return undefined if img is null or undefined
    return 'assets/img/no-images.png';
  }
  
  detectFileType(base64Data: string):  'image' | 'unknown' {
    // Remove the prefix (e.g., 'data:image/jpeg;base64,', 'data:application/pdf;base64,')
    const dataPart = base64Data.split(',')[1];

    // Decode the first few bytes to check the file type
    const decodedData = atob(dataPart.substring(0, 100)); // Decode only the first 100 bytes

    // Check for PDF signature
    
    // Check for image signatures
    if (
      decodedData.startsWith('\xFF\xD8') || // JPEG
      decodedData.startsWith('\x89\x50\x4E\x47\x0D\x0A\x1A\x0A') || // PNG
      decodedData.startsWith('\x47\x49\x46\x38\x37\x61') || // GIF87a
      decodedData.startsWith('\x47\x49\x46\x38\x39\x61') || // GIF89a
      decodedData.startsWith('\x42\x4D') // BMP
    ) {
      return 'image';
    }

    return 'unknown';
  }

}
