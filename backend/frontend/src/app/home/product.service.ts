import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Product } from '../product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }
  private apiURL = 'http://127.0.0.1:8000/api';

  // Options for HTTP requests
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  addProduct(productData: FormData): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.post(`${this.apiURL}/addProduct/`, productData, { headers })
      .pipe(catchError(this.errorHandler));
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

  getAllProducts(): Observable<Product[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<Product[]>(`${this.apiURL}/getAllproduct/`,{headers})
      .pipe(catchError(this.errorHandler));
  }
  find(id: any): Observable<Product> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<Product>(`${this.apiURL}/viewProduct/${id}`,{headers})
      .pipe(catchError(this.errorHandler));
  }
  delete(id: any): Observable<Product> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.delete<Product>(`${this.apiURL}/deleteProduct/${id}`,{headers})
      .pipe(catchError(this.errorHandler));
  }

  
}
