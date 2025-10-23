import { Injectable } from '@angular/core';
import { Resolve,ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import {ProductsService} from '../Services/products.service';

@Injectable({
  providedIn: 'root'
})
export class ProductResolver implements Resolve<any> {
  constructor(private productsService: ProductsService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const productId = route.paramMap.get('id')!;
    return this.productsService.getProductDetails(parseInt(productId));
  }
}
