import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { tokenInterceptor } from '../token.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { MatSnackBarModule } from '@angular/material/snack-bar'



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
   HttpClientModule,
   MatSnackBarModule

  
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()), // Use HttpClient with DI for interceptors
    { provide: HTTP_INTERCEPTORS, useValue: tokenInterceptor, multi: true } // Register the interceptor
  ],
})
export class UserModule { }
