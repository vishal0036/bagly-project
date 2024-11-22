import { Component, OnInit  } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-model-slider',
  standalone: true,
  imports: [],
  templateUrl: './model-slider.component.html',
  styleUrl: './model-slider.component.css'
})
export class ModelSliderComponent implements OnInit  {
  // ngOnInit lifecycle hook to initialize the Slick carousel
  ngOnInit(): void {
    
    $('.slick-carousel').slick({
      infinite: true,           
      slidesToShow: 3,          
      slidesToScroll: 1,        
      autoplay: false,           
      autoplaySpeed: 3000,      
      dots: true,               
      arrows: true              
    });
  }

}
