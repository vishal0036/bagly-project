import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl: string = 'https://localhost/testing/wp-json/wc/v3/products';
  private apiAttributesUrl: string = 'https://localhost/testing/wp-json/wc/v3/products/attributes/1/terms';
  private consumerKey: string = 'ck_55e56f06661c9fffcb7b89409587977fcf8db2e2';
  private consumerSecret: string = 'cs_276520d04d524837a57ee337cc2861143e23e597';
  
  private cart: any[] = []; // Local array to simulate a cart

  constructor(private http: HttpClient) {}

   // Fetch all products
   fetchProducts(): Observable<any[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(`${this.consumerKey}:${this.consumerSecret}`)
    });

    return this.http.get<any[]>(this.apiUrl, { headers });
  }

  // Fetch products filtered by color term
  fetchProductsByColorTerm(colorTermId: number): Observable<any[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(`${this.consumerKey}:${this.consumerSecret}`)
    });

    // Adjust the request URL to properly filter by color (assuming pa_color is the correct slug)
    return this.http.get<any[]>(`${this.apiUrl}?filter[attribute_pa_color]=${colorTermId}`, { headers });
  }

  // Fetch terms for the 'pa_color' attribute
  fetchColorTerms(): Observable<any[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(`${this.consumerKey}:${this.consumerSecret}`)
    });

    return this.http.get<any[]>(this.apiAttributesUrl, { headers });
  }

  // addToCart(product: any) {
  //   this.cart.push(product);
  //   console.log('Product added to cart:', product);
  //   localStorage.setItem('cart', JSON.stringify(this.cart)); // Store cart in localStorage
  // }

  // getCart() {
  //   return JSON.parse(localStorage.getItem('cart') || '[]');
  // }
}
