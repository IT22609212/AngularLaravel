import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { Router, RouterModule } from '@angular/router';
import { User } from '../../user';
import { AuthServiceService } from '../auth-service.service';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RegisterComponent,FormsModule,ReactiveFormsModule,RouterModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  password:any=[];
  registerForm!: FormGroup;
  user!:User;
  container!: HTMLElement;


  constructor (public authService:AuthServiceService,private router:Router,
    private dialog:MatSnackBar
  ){}

  ngOnInit(): void {
    this.registerForm= new FormGroup({
      name:new FormControl('',[Validators.required]),
      email:new FormControl('',[Validators.required,Validators.email]),
      password:new FormControl('',[Validators.required]),
      confirmPassword:new FormControl('',[Validators.required]),
      
    }) //{validators:this.passwordMatchValidator });

    this.container = document.getElementById('container') as HTMLElement;
    
  }

  OnSubmit(){
    if(this.registerForm.valid){
      console.log('Form Submitted!',this.registerForm.value);
      this.authService.register(this.registerForm.value).subscribe((res:any)=>{
        this.dialog.open('Registered Successfully!', '', {
          duration: 3000, // Display the message for 3 seconds
          verticalPosition: 'top', // Position the message at the top
          horizontalPosition: 'center', // Position the message at the center
          panelClass: ['success-snackbar']
        });
        
        this.router.navigateByUrl('UserReg/dashboard');
        
      })
      
    }
   
  }

  get f(){
    return this.registerForm.controls;
  }
  signUp() {
    this.container.classList.add("right-panel-active");
  }

  signIn() {
    this.container.classList.remove("right-panel-active");
  }



}
