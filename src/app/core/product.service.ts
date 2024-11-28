import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// product.service.ts
@Injectable({
    providedIn: 'root'
  })
  export class ProductService {
    private apiUrl: string = 'https://localhost/testing/wp-json/wc/v3/products';
    private consumerKey: string = 'ck_55e56f06661c9fffcb7b89409587977fcf8db2e2';
    private consumerSecret: string = 'cs_276520d04d524837a57ee337cc2861143e23e597';
    
    private cart: any[] = []; // Local array to simulate a cart
  
    constructor(private http: HttpClient) {}
  
    fetchProducts(): Observable<any[]> {
      const headers = new HttpHeaders({
        'Authorization': 'Basic ' + btoa(`${this.consumerKey}:${this.consumerSecret}`)
      });
  
      return this.http.get<any[]>(this.apiUrl, { headers });
    }
  
    addToCart(product: any) {
      // Logic to add the product to the cart
      this.cart.push(product); // Add the product to the cart array
      console.log('Product added to cart:', product);
      // You can use localStorage or a cart service for persistent storage
      localStorage.setItem('cart', JSON.stringify(this.cart)); // Store cart in localStorage
    }
  
    getCart() {
      // Get the cart (from localStorage or memory)
      return JSON.parse(localStorage.getItem('cart') || '[]');
    }
  }
