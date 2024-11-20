import { Component } from '@angular/core';
import { ProductsService } from 'src/app/Services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent {


product = {
    name: '',
    price: '',
image: '',
    description: '',
    category:''
  }
  categories = ['Living Room', 'Bedroom', 'Office', 'Outdoor', 'Dining', 'Decor'];
  constructor (private productsService: ProductsService,private router: Router){}

  onImageChange(event: any): void {
    const file = event.target.files[0]; // Get the first file from the input
    this.product.image = file; // Assign it to product.image
  }

  createProduct(): void {
    const formData = new FormData();
    formData.append('name', this.product.name);
    formData.append('price', this.product.price);
    formData.append('description', this.product.description);
    formData.append('category',this.product.category);
    if (this.product.image) {
      formData.append('image', this.product.image);  // Make sure the image is a file object
  }
  console.log(formData);
    this.productsService.createProduct(formData).subscribe({
      next: (response) => {
        console.log('Product created successfully:', response);

        this.router.navigate(['/products-for-admin']);
      },
      error: (error) => {
        console.error('Error creating product:', error);
      }
    });
  }

}
