import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductService } from '../core/product.service';  // Adjust path as needed

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cart: any[] = [];  // Array to store cart products
  constructor(private productService: ProductService) {}
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
  this.productService.removeFromCart(product); // Remove product using ProductService
  this.loadCart(); // Reload cart to reflect changes
}


  // Method to calculate the total price of items in the cart
  getTotal(): number {
    const total = this.cart.reduce((sum, item) => sum + parseFloat(item.price.replace(/[^0-9.-]+/g, '')), 0);
    return total;
  }
  
  
}
 