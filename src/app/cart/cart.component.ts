import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cart: any[] = [];  // Array to store cart products

  ngOnInit(): void {
    this.loadCart();
  }

  // Load cart from localStorage
  loadCart(): void {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cart = JSON.parse(storedCart);  
    }
  }

  // Method to remove item from cart
  removeFromCart(product: any): void {
    this.cart = this.cart.filter(item => item.id !== product.id);  
    localStorage.setItem('cart', JSON.stringify(this.cart)); // Update cart in localStorage
  }

  // Method to calculate the total price of items in the cart
  getTotal(): number {
    const total = this.cart.reduce((sum, item) => sum + parseFloat(item.price.replace(/[^0-9.-]+/g, '')), 0);
    return total;
  }
  
  
}
 