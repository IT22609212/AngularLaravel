import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private apiURL = 'http://127.0.0.1:8000/api';

  // Options for HTTP requests
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  addToCart(productId: number, quantity: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = this.httpOptions.headers.set('Authorization', `Bearer ${token}`);
    const body = { productId, quantity };
    return this.httpClient.post<any>(`${this.apiURL}/addCart/`, body, { headers });
  }

  removeFromCart(cartItemId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = this.httpOptions.headers.set('Authorization', `Bearer ${token}`);
    return this.httpClient.delete<any>(`${this.apiURL}/removeCart/${cartItemId}`, { headers });
  }

  updateCartQuantity(cartItemId: number, quantity: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = this.httpOptions.headers.set('Authorization', `Bearer ${token}`);
    return this.httpClient.put<any>(`${this.apiURL}/updateCart/${cartItemId}`, { quantity }, { headers });
  }

  getCart(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = this.httpOptions.headers.set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<any>(`${this.apiURL}/getCart/`, { headers });
  }
}
