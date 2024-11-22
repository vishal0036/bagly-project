import { Component } from '@angular/core';
import { CarouselComponent } from '../carousel/carousel.component';
import { ModelSliderComponent } from '../model-slider/model-slider.component';
import { ProductSliderComponent } from '../product-slider/product-slider.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselComponent, ModelSliderComponent,ProductSliderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
