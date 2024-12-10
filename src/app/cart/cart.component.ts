import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../core/product.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cart: any[] = [];  // Array to store cart products
  count: number = 0;
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    // Subscribe to cart changes from the service
    this.productService.getCartObservable().subscribe((cart: any[]) => {
      this.cart = cart;
    });
  }

  incrementCount(): void {
    this.count++;
  }

  decrementCount(): void {
    this.count--;
  }
  // Method to remove item from cart
  removeFromCart(product: any): void {
    this.productService.removeFromCart(product); // Use service to remove the product
  }


  
  // Method to calculate the total price of items in the cart
  getTotal(): number {
    const total = this.cart.reduce((sum, item) => sum + parseFloat(item.price.replace(/[^0-9.-]+/g, '')), 0);
    return total;
  }
}
