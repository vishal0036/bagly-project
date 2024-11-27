import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-collections',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './collections.component.html',
  styleUrl: './collections.component.css'
})
export class CollectionsComponent {
  products: any[] = []; // To store the fetched list of products
  isLoading = true;      // Flag to show loading state
  errorMessage: string | null = null; // Store error messages

  private apiUrl: string = 'https://localhost/testing/wp-json/wc/v3/products'; // WooCommerce API endpoint
  private consumerKey: string = 'ck_55e56f06661c9fffcb7b89409587977fcf8db2e2'; // Replace with your WooCommerce consumer key
  private consumerSecret: string = 'cs_276520d04d524837a57ee337cc2861143e23e597'; // Replace with your WooCommerce consumer secret

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchProductsData(); 
  }

  // Method to fetch all products
  fetchProductsData() {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(`${this.consumerKey}:${this.consumerSecret}`)
    });
    console.log(headers);

    this.http.get<any[]>(this.apiUrl, { headers }).subscribe(
      (data) => {
        this.products = data;   // Assign the response data to products
        this.isLoading = false;  // Set loading state to false
      },
      (error) => {
        console.error('Error fetching products:', error); // Log any errors
        this.errorMessage = 'Failed to load products data.'; // Set error message
        this.isLoading = false; // Set loading state to false
      }
    );
  }

  // Method to add product to cart
  addToCart(product: any) {
    // You can modify this method to suit your cart system
    console.log('Product added to cart:', product);
    // For now, we'll just log the product to the console
  }

}
