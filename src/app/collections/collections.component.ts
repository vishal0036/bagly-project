// collections.component.ts

import { Component, OnInit } from '@angular/core';
import { ProductService } from '../core/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-collections',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.css']
})
export class CollectionsComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  colorTerms: any[] = [];
  selectedTerm: number | null = null;
  isLoading = true;
  errorMessage: string | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.fetchProductsData();
    this.fetchColorTermsData();
  }

  // Fetch all products data
  fetchProductsData() {
    this.productService.fetchProducts().subscribe(
      (data) => {
        console.log('Fetched Products Data:', data);
        this.products = data;
        this.isLoading = false;
        this.errorMessage = null;
        this.filteredProducts = this.products; // Show all products initially
      },
      (error) => {
        console.error('Error fetching products:', error);
        this.errorMessage = 'Failed to load product data.';
        this.isLoading = false;
      }
    );
  }

  // Fetch color terms (attributes like color)
  fetchColorTermsData() {
    this.productService.fetchColorTerms().subscribe(
      (data) => {
        console.log('Fetched Color Terms Data:', data);
        this.colorTerms = data;
      },
      (error) => {
        console.error('Error fetching color terms:', error);
        this.errorMessage = 'Failed to load color terms.';
      }
    );
  }

  // Handle when a color term is clicked
  onTermClick(termId: number, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked) {
      this.selectedTerm = termId;  // Set the selected color term ID
      this.fetchProductsByColorTerm(termId); // Fetch products for this term
    } else {
      this.selectedTerm = null; // Reset selected term if unchecked
      this.filteredProducts = []; // Clear the filtered products
    }
  }

  // Fetch products based on the selected color term
  fetchProductsByColorTerm(colorTermId: number) {
    this.isLoading = true;
    this.productService.fetchProductsByColorTerm(colorTermId).subscribe(
      (data) => {
        if (data.length > 0) {
          console.log('Fetched products for color term:', data);
          this.filteredProducts = data; // Set the filtered products based on the selected term
        } else {
          console.log('No products found for the selected color.');
          this.filteredProducts = []; // No products found for this color term
          this.errorMessage = 'No products found for this color.';
        }
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching products for color term:', error);
        this.errorMessage = 'Failed to load products for the selected color term.';
        this.isLoading = false;
      }
    );
  }
}
