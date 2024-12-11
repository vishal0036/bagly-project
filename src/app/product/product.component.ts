import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink} from '@angular/router';
import { Router } from '@angular/router';
import { ProductService } from '../core/product.service';  // Adjust path as needed
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, RouterLink],  // Include necessary imports if this is a standalone component
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  product: any;
  isLoading: boolean = true;
  errorMessage: string = '';
  breadcrumbs: { label: string; url: string }[] = []; // Breadcrumbs array
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
    
  ) {}

  ngOnInit(): void {
    // Retrieve product ID from the route
    const productId = this.route.snapshot.paramMap.get('id');
    
    if (productId) {
      // Fetch the product by ID from the service
      this.productService.getProductById(productId).subscribe(
        (data) => {
          this.product = data;  // Store product data
          this.isLoading = false;  // Update loading state
          this.updateBreadcrumbs(productId, this.product?.name);
        },
        (error) => {
          console.error('Error fetching product:', error);  // Log error for debugging
          this.errorMessage = 'Product not found';  // Display error message
          this.isLoading = false;  // Update loading state
        }
      );
    } else {
      this.errorMessage = 'No product ID provided';
      this.isLoading = false;
    }
  }

  addToCart(): void {
    if (this.product) {
      this.productService.addToCart(this.product);
      alert(`${this.product.name} has been added to the cart.`);
      // this.router.navigate(['/cart']);
    }
  }
    // Update breadcrumbs dynamically
    private updateBreadcrumbs(productId: string, productName: string): void {
      this.breadcrumbs = [
        { label: 'Home', url: '/' },
        { label: 'Products', url: '/collections' },
        { label: productName || `Product ${productId}`, url: `/products/${productId}` }
      ];
    }
}