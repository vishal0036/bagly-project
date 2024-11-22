import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent{
  images: string[] = [
    '/assets/images/L4plus-min.jpg', 
    '/assets/images/L5-min.jpg', 
    '/assets/images/L6-min.jpg', 
    '/assets/images/L7-min.jpg'  
  ];
  // currentIndex Property
  currentIndex: number = 0;
  private autoplayInterval: any; 

  // Navigate to the next image
  nextImage(): void {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  // Navigate to the previous image
  prevImage(): void {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  // Start autoplay
  startAutoplay(): void {
    this.autoplayInterval = setInterval(() => {
      this.nextImage(); // Automatically navigate to the next image
    }, 5000); // Change image every 3 seconds
  }

  // Stop autoplay
  stopAutoplay(): void {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
    }
  }

  // Angular lifecycle hooks
  ngOnInit(): void {
    this.startAutoplay(); // Start autoplay when the component initializes
  }

  ngOnDestroy(): void {
    this.stopAutoplay(); // Clear interval when the component is destroyed
  }
}
