import { Component } from '@angular/core';
import { CarouselComponent } from '../carousel/carousel.component';
import { ModelSliderComponent } from '../model-slider/model-slider.component';
import { ProductSliderComponent } from '../product-slider/product-slider.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselComponent, ModelSliderComponent,ProductSliderComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
