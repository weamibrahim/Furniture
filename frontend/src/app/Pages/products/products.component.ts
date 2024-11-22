import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/Services/products.service';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css'],
    standalone: false
})
export class ProductsComponent implements OnInit {
  constructor(private productsService: ProductsService) {}

  products: any[] = [];
  nextPage: string | null = null;
  previousPage: string | null = null;
  loading: boolean = true;
  ngOnInit(): void {
    this.fetchProducts();
  }

  handleSearchResults(searchResults: any[]): void {
    if (searchResults.length > 0) {
      this.products = searchResults;
    } else {
      this.fetchProducts();
    }
  }
  fetchProducts(url: string | null = null): void {
    console.log('Fetching products...', url);

    let fetchUrl =
      url || 'https://furniture-production-6b23.up.railway.app/products/';

      if (fetchUrl.startsWith('http://')) {
        fetchUrl = fetchUrl.replace('http://', 'https://');
      }
      this
    this.productsService.getProducts(fetchUrl).subscribe({
      next: (response) => {
        console.log('Products:', response);
        this.products = response.results;
        this.nextPage = response.next;
        this.previousPage = response.previous;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching products:', error);
        this.loading = false;
      },
    });
  }

  nextPageHandler(): void {
    if (this.nextPage) {
      this.fetchProducts(this.nextPage);
    }
  }

  previousPageHandler(): void {
    if (this.previousPage) {
      this.fetchProducts(this.previousPage);
    }
  }
}
