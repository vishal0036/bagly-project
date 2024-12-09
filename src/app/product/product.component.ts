import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Router } from '@angular/router';
import { ProductService } from '../core/product.service';  // Adjust path as needed
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],  // Include necessary imports if this is a standalone component
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  product: any;
  isLoading: boolean = true;
  errorMessage: string = '';

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
      this.router.navigate(['/cart']);
    }
  }
}