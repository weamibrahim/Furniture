import { Component ,Output,EventEmitter} from '@angular/core';
import { ProductsService } from 'src/app/Services/products.service';
@Component({
    selector: 'app-search-by-category',
    templateUrl: './search-by-category.component.html',
    styleUrls: ['./search-by-category.component.css'],
    standalone: false
})
export class SearchByCategoryComponent  {



  constructor(private productsService: ProductsService) { }

  @Output() searchResults = new EventEmitter<any[]>();

  search(category: string): void {
    this.productsService.searchByCategory(category).subscribe(
     {
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
