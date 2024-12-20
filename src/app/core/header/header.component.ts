import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ShoppingCartComponent } from '../../shopping-cart/shopping-cart.component';
import { ProductService } from '../product.service';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../../search/search.component';



@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, ShoppingCartComponent, CommonModule, SearchComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  cartCount = 0;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
      this.productService.getCartCountObservable().subscribe(count => {
          this.cartCount = count;
      });
  }
  
}
