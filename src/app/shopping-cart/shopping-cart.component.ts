import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../core/product.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent implements OnInit {
  cart: any[] = [];  // Array to store cart products

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    // Subscribe to cart changes from the service
    this.productService.getCartObservable().subscribe((cart: any[]) => {
      this.cart = cart;
    });
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
