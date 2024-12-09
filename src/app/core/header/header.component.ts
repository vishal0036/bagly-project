import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ShoppingCartComponent } from '../../shopping-cart/shopping-cart.component';



@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, ShoppingCartComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
