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
    if (this.count > 0) {
      this.count--;
    }
  }

   // Method to increment quantity of a product
   incrementQuantity(product: any): void {
    product.quantity++;
    this.updateCart(product); // Update the cart after incrementing
  }

   // Method to decrement quantity of a product
   decrementQuantity(product: any): void {
    if (product.quantity > 1) {
      product.quantity--;
      this.updateCart(product); // Update the cart after decrementing
    }
  }
    // Method to update the cart with new quantity and recalculate price
    updateCart(product: any): void {
      // Update the product quantity in the cart
      this.productService.updateCart(product);
    }
  // Method to remove item from cart
  removeFromCart(product: any): void {
    this.productService.removeFromCart(product); // Use service to remove the product
  }


  
  // Method to calculate the total price of items in the cart
    // Method to calculate the total price of items in the cart
    getTotal(): number {
      return this.cart.reduce((sum, item) => {
        // Remove currency symbols and calculate price based on quantity
        const itemPrice = parseFloat(item.price.replace(/[^0-9.-]+/g, ''));
        return sum + (itemPrice * item.quantity); // Add the price of each item multiplied by its quantity
      }, 0);
    }
}
