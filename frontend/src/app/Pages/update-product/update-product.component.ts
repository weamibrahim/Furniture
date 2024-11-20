import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/Services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  productId: number | undefined;
  product: any = {
    name: '',
    price: '',
    description: '',
    category: '',
    image: null // Add this to store the image file
  };
  categories = ['Living Room', 'Bedroom', 'Office', 'Outdoor', 'Dining'];
  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private router: Router
  ) {}

/*************  ✨ Codeium Command ⭐  *************/
/******  57d3e6b1-2059-4d2b-8583-a81f10b0cb57  *******/
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.productId = +params['id'];
      this.loadProductDetails();
    });
  }

  loadProductDetails(): void {
    if (this.productId) {
      this.productsService.getProductDetails(this.productId).subscribe({
        next: (response) => {
          this.product = response;
        },
        error: (error) => {
          console.error('Error fetching product details:', error);
        }
      });
    }
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.product.image = file;  // Store the selected image
    }
  }

  updateProduct(): void {
    if (this.productId) {
      const formData = new FormData();
      formData.append('name', this.product.name);
      formData.append('price', this.product.price);
      formData.append('description', this.product.description);
      formData.append('category', this.product.category);

      // If there's a new image, append it to the form data
      if (this.product.image && this.product.image instanceof Blob) {
        formData.append('image', this.product.image, this.product.image.name);
      }

      this.productsService.updateProduct(this.productId, formData).subscribe({
        next: (response) => {
          console.log('Product updated successfully:', response);
          this.router.navigate(['/products-for-admin']);
        },
        error: (error) => {
          console.error('Error updating product:', error);
        }
      });
    }
  }

}
