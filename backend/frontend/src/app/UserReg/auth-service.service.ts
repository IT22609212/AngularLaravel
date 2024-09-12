import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';  // Import tap correctly

import { User } from '../user';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private apiURL = 'http://127.0.0.1:8000/api';

  // Options for HTTP requests
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  register(user: any): Observable<User> {
    return this.httpClient.post<User>(`${this.apiURL}/register/`, JSON.stringify(user), this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  getAll(): Observable<User[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<User[]>(`${this.apiURL}/getAll/`,{ headers })
      .pipe(catchError(this.errorHandler));
  }

  delete(id: any): Observable<User> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.delete<User>(`${this.apiURL}/deleteUser/${id}`, { headers })
      .pipe(catchError(this.errorHandler));
  }

  find(id: any): Observable<User> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<User>(`${this.apiURL}/findUser/${id}`, { headers })
      .pipe(catchError(this.errorHandler));
  }

  login(credentials: { email: string; password: string }): Observable<{ token: string; userId:string}> {
    return this.httpClient.post<{ token: string; userId:string }>(`${this.apiURL}/UserLogin/`, credentials, this.httpOptions)
      .pipe(
         tap((response: { token: string; userId: string }) => {
          // Store token and user ID in localStorage
          localStorage.setItem('token', response.token);
          localStorage.setItem('userId', response.userId);
        }),
        catchError(this.errorHandler)
      );
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(){
    let token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', token || '');
    return this.httpClient.get(this.apiURL + 'logout', { headers });
  
  }
  
  
  
  
  getUserProfile(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<any>(`${this.apiURL}/userProfile`, { headers })
      .pipe(
        tap(response => console.log('API Response:', response)), // Log the response
        catchError(this.errorHandler)
      );
  }
  
  updateUserProfile(userData:any):Observable<any>{
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.put<any>(`${this.apiURL}/userProfile/`,userData,{headers})
  }
  deleteUserProfile():Observable<any>{
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.delete<any>(`${this.apiURL}/userProfile/`,{headers})
  }

  private errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  
}
