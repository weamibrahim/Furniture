import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/Services/products.service';
@Component({
  selector: 'app-products-for-admin',
  templateUrl: './products-for-admin.component.html',
  styleUrls: ['./products-for-admin.component.css']
})
export class ProductsForAdminComponent implements OnInit {
  constructor(private productsService: ProductsService) { }

  products: any[] = [];

  nextPage: string | null = null;
  previousPage: string | null = null;
  ngOnInit(): void {
this.fetchProducts();

  }

  handleSearchResults(searchResults: any[]): void {
  if(searchResults.length>0){
    this.products = searchResults;
  }else{
    this.fetchProducts();
  }
}

  fetchProducts(url: string | null = null): void {
    console.log('Fetching products...',url);
    // Use the provided URL or default to the initial endpoint
    const fetchUrl = url || 'http://localhost:8000/products/'; // Replace with your default URL

    this.productsService.getProducts(fetchUrl).subscribe({
      next: (response) => {
        console.log('Products:', response);
        this.products = response.results;
        this.nextPage = response.next;
        this.previousPage = response.previous;
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      }
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


deleteProduct(id: number):void{
  this.productsService.deleteProduct(id).subscribe({
    next: (response) => {
      console.log('Product deleted successfully:', response);
      this.fetchProducts();
    },
    error: (error) => {
      console.error('Error deleting product:', error);
    }
  })
}
}
