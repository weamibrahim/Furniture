import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Form } from '@angular/forms';
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getProducts(url: string): Observable<any> {
    return this.http.get(url);
  }

  getProduct(id: number): Observable<any> {
    return this.http.get(
      `https://furniture-production-6b23.up.railway.app/products/${id}`
    );
  }

  getProductDetails(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(
      `https://furniture-production-6b23.up.railway.app/products/${id}/`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      }
    );
  }
  deleteProduct(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(
      `https://furniture-production-6b23.up.railway.app/products/delete/${id}/`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      }
    );
  }

  updateProduct(id: number, formData: FormData): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.put(
      `https://furniture-production-6b23.up.railway.app/products/update/${id}/`,
      formData,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  }
  createProduct(formData: FormData): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post(
      `https://furniture-production-6b23.up.railway.app/products/create/`,
      formData,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  }

  searchByName(name: string): Observable<any> {
    return this.http.get(
      `https://furniture-production-6b23.up.railway.app/productsByName/?name=${name}`
    );
  }

  searchByCategory(category: string): Observable<any> {
    return this.http.get(
      `https://furniture-production-6b23.up.railway.app/productsByCategory/?category=${category}`
    );
  }
}
