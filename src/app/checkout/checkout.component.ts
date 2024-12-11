import { Component } from '@angular/core';
import { ProductService } from '../core/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  cart: any[] = [];
  total: number = 0;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    // Subscribe to cart changes
    this.productService.getCartObservable().subscribe(cart => {
      this.cart = cart;
      this.calculateTotal();
    });
  }

  calculateTotal(): void {
    this.total = this.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

  removeItem(item: any): void {
    this.productService.removeFromCart(item);
  }
}
