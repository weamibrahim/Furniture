import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/Services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  productId: number | undefined;
  product: any = {};

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    // Fetch the product ID from the route parameters
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.productId = +id; // Convert to number
        this.fetchProductDetails(this.productId);
      }
    });
  }

  fetchProductDetails(id: number): void {
    this.productsService.getProductDetails(id).subscribe({
      next: (response) => {
        console.log('Product details:', response);
        this.product = response;
      },
      error: (error) => {
        console.error('Error fetching product details:', error);
      }
    });
  }
}
