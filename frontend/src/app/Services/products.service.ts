import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import { Form } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor( private http: HttpClient) { }


  getProducts(url:string): Observable<any> {
    return this.http.get(url)
  }

  getProduct(id: number): Observable<any> {
    return this.http.get(`http://localhost:8000/products/${id}`)
  }

  getProductDetails(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(`http://localhost:8000/products/${id}/`,
      { headers:
        {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`


    } }
    )
  }
  deleteProduct(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(`http://localhost:8000/products/delete/${id}/`,{
      headers:
        {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`

    }})


  }

  updateProduct(id: number,formData:FormData): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.put(`http://localhost:8000/products/update/${id}/`, formData,
       { headers:
        {

      'Authorization': `Token ${token}`


    } })
  }
  createProduct(formData:FormData): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post(`http://localhost:8000/products/create/`, formData,
       { headers:
        {

      'Authorization': `Token ${token}`
        }})

  }
}
