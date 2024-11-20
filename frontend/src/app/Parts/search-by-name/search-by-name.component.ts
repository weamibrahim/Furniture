import { Component, EventEmitter, Output } from '@angular/core';
import { ProductsService } from 'src/app/Services/products.service';

@Component({
  selector: 'app-search-by-name',
  templateUrl: './search-by-name.component.html',
  styleUrls: ['./search-by-name.component.css']
})
export class SearchByNameComponent {
  name = ''; // Input for the search query
  @Output() searchResults = new EventEmitter<any[]>(); // Emit results to the parent component

  constructor(private productsService: ProductsService) {}

  search(): void {
    if (!this.name.trim()) {
      this.searchResults.emit([]); // Clear results if no input
      return;
    }

    this.productsService.searchByName(this.name).subscribe({
      next: (products) => {
        console.log(products)
        this.searchResults.emit(products); // Send results to parent
      },
      error: () => {
        this.searchResults.emit([]); // Clear results on error
      }
    });
  }
}
