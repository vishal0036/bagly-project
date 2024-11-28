import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductService } from '../core/product.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-collections',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './collections.component.html',
  styleUrl: './collections.component.css'
})
export class CollectionsComponent {
  products: any[] = [];
  isLoading = true;
  errorMessage: string | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.fetchProductsData();
  }

  fetchProductsData() {
    this.productService.fetchProducts().subscribe(
      (data) => {
        this.products = data;
        this.isLoading = false;
        this.errorMessage = null;
      },
      (error) => {
        console.error('Error fetching products:', error);
        this.errorMessage = 'Failed to load product data.';
        this.isLoading = false;
      }
    );
  }

  addToCart(product: any) {
    this.productService.addToCart(product); // Call service method to add product to cart
  }

}
