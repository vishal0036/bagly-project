import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
// import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl: string = 'https://localhost/testing/wp-json/wc/v3/products';
  private apiAttributesUrl: string = 'https://localhost/testing/wp-json/wc/v3/products/attributes/1/terms';
  private consumerKey: string = 'ck_55e56f06661c9fffcb7b89409587977fcf8db2e2';
  private consumerSecret: string = 'cs_276520d04d524837a57ee337cc2861143e23e597';
  
  private cart: any[] = []; // Local array to simulate a cart
  private cartSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]); // To broadcast cart changes
  private cartCountSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0); 

  constructor(private http: HttpClient) {
    // Load cart from localStorage if available
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cart = JSON.parse(storedCart);
    }
    this.cartSubject.next(this.cart); // Emit initial cart state
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

  // Method to fetch product by ID Yeh function kisi specific product ko ID ke basis pe fetch karta hai.
  getProductById(productId: string): Observable<any> {
    const url = `${this.apiUrl}/${productId}`;
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(`${this.consumerKey}:${this.consumerSecret}`)
    });

    return this.http.get<any>(url, { headers });
  }

  // Add product to the cart (using localStorage)
  addToCart(product: any): void {
    this.cart.push(product);
    localStorage.setItem('cart', JSON.stringify(this.cart)); // Save cart to localStorage
    this.cartSubject.next(this.cart); // Emit updated cart state
    this.cartCountSubject.next(this.cart.length);
  }

  // Remove product from cart
  removeFromCart(product: any): void {
    this.cart = this.cart.filter(item => item.id !== product.id);
    localStorage.setItem('cart', JSON.stringify(this.cart)); // Update cart in localStorage
    this.cartSubject.next(this.cart); // Emit updated cart state
    this.cartCountSubject.next(this.cart.length);
  }

  // Get the cart from localStorage
  getCart(): any[] {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  }

  // Observable to watch cart changes
  getCartObservable(): Observable<any[]> {
    return this.cartSubject.asObservable();
  }
   // Observable to watch cart count changes
   getCartCountObservable(): Observable<number> {
    return this.cartCountSubject.asObservable();
  }
}
