import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../core/product.service';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchQuery: string = ''; // Store search query
  searchResults: any[] = []; // Store the search results

  constructor(
    private productService: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Get the search query from the URL if it exists
    this.activatedRoute.queryParams.subscribe(params => {
      const query = params['s'];
      if (query) {
        this.searchQuery = query;
        this.getResults(this.searchQuery);
      }
    });
  }

  // Method to handle search input
  onSearch(event: Event): void {
    const input = (event.target as HTMLInputElement).value;
    this.searchQuery = input;

    if (this.searchQuery.trim()) {
      this.router.navigate([], {
        queryParams: { s: this.searchQuery },
        queryParamsHandling: 'merge', 
      });
      this.getResults(this.searchQuery);
    } else {
      this.searchResults = [];
      this.router.navigate([], {
        queryParams: { s: null }, // Clear the search query in the URL
        queryParamsHandling: 'merge',
      });
    }
  }

  // Method to trigger search when the search button is clicked
  onSearchButtonClick(): void {
    if (this.searchQuery.trim()) {
      this.router.navigate([], {
        queryParams: { s: this.searchQuery },
        queryParamsHandling: 'merge',
      });
      this.getResults(this.searchQuery);
    }
  }

  // Method to clear the search field
  onClearSearch(): void {
    this.searchQuery = '';
    this.searchResults = []; // Clear results when search field is cleared
    this.router.navigate([], {
      queryParams: { s: null },
      queryParamsHandling: 'merge',
    });
  }

  // Fetch products based on search query
  getResults(query: string): void {
    this.productService.fetchProducts().subscribe(
      (products: any[]) => {
        this.searchResults = products.filter(product =>
          product.name.toLowerCase().includes(query.toLowerCase())
        );
      },
      (error) => {
        console.error('Error fetching products:', error);
        this.searchResults = [];  // Reset search results on error
      }
    );
  }
}
