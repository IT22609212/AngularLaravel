import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // Corrected the property name
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  token: string | null = null;
  isSubmitted = false;
  errormsg: string = "";

  constructor(public authService: AuthServiceService, private router: Router, 
    private formbuilder: FormBuilder,
    private dialog:MatSnackBar) {}

  // Corrected method name to follow convention
 

  ngOnInit(): void {
    this.token = this.authService.getToken();
    console.log('Token', this.token);
    this.loginForm = this.formbuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
  onSubmit() {
    this.isSubmitted = true;
  
    if (this.loginForm.invalid) {
      return;
    }
  
    this.authService.login(this.loginForm.value).subscribe({
      next: (res: any) => {
        console.log('Login Success! Full Response:', res);
        
        // Assuming the token is directly in the response, adjust if necessary
        const token = res.token || res.access_token || res.data?.token; // Adjust this based on what the server actually sends
        
        if (token) {
          localStorage.setItem('token', token); // Save token to localStorage
        } else {
          console.error('Token not found in response!');
        }
  
        this.dialog.open('Welcome Back!', '', {
          duration: 3000, 
          verticalPosition: 'top', 
          horizontalPosition: 'center', 
          panelClass: ['custom-snackbar']
        });
  
        this.router.navigateByUrl('/UserReg/dashboard');
        this.loginForm.reset();
      },
      error: (error) => {
        this.errormsg = 'Invalid email or password';
        console.error('Login error:', error);
      }
    });
  }
  

  // Method to get form controls for validation
  get f() {
    return this.loginForm.controls;
  }
}
