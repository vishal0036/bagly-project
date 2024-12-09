import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl: string = 'https://localhost/testing/wp-json/wc/v3/products';
  private apiAttributesUrl: string = 'https://localhost/testing/wp-json/wc/v3/products/attributes/1/terms';
  private consumerKey: string = 'ck_55e56f06661c9fffcb7b89409587977fcf8db2e2';
  private consumerSecret: string = 'cs_276520d04d524837a57ee337cc2861143e23e597';
  
  private cart: any[] = []; // Local array to simulate a cart

  constructor(private http: HttpClient) {
    // Load cart from localStorage if available
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cart = JSON.parse(storedCart);
    }
  }

   // Fetch all products
   fetchProducts(): Observable<any[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(`${this.consumerKey}:${this.consumerSecret}`)
    });

    return this.http.get<any[]>(this.apiUrl, { headers });
  }


  // Fetch terms for the 'pa_color' attribute
  fetchColorTerms(): Observable<any[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(`${this.consumerKey}:${this.consumerSecret}`)
    });

    return this.http.get<any[]>(this.apiAttributesUrl, { headers });
  }

  // Method to fetch product by ID
  getProductById(productId: string): Observable<any> {
    const url = `${this.apiUrl}/${productId}`;  // Construct the API URL using the product ID
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(`${this.consumerKey}:${this.consumerSecret}`)  // Authorization for WooCommerce
    });

    return this.http.get<any>(url, { headers });
  }

 // Add product to the cart (using localStorage)
 addToCart(product: any): void {
  this.cart.push(product);
  console.log('Product added to cart:', product);
  localStorage.setItem('cart', JSON.stringify(this.cart)); // Save cart to localStorage
}

// Remove product from cart
removeFromCart(product: any): void {
  this.cart = this.cart.filter(item => item.id !== product.id);  
  localStorage.setItem('cart', JSON.stringify(this.cart)); // Update cart in localStorage
}
  // Get the cart from localStorage
  getCart(): any[] {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  }
}
