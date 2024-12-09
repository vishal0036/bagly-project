// collections.component.ts

import { Component, OnInit } from '@angular/core';
import { ProductService } from '../core/product.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-collections',
  standalone: true,
  imports: [CommonModule, RouterLink],
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



}