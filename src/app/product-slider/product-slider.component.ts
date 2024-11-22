import { Component, OnInit} from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-product-slider',
  standalone: true,
  imports: [],
  templateUrl: './product-slider.component.html',
  styleUrl: './product-slider.component.css'
})
export class ProductSliderComponent implements OnInit{
  ngOnInit(): void {
    
    $('.slick-carousel').slick({
      infinite: true,           
      slidesToShow: 3,          
      slidesToScroll: 1,        
      autoplay: true,           
      autoplaySpeed: 3000,                    
      arrows: true              
    });
  }
}
