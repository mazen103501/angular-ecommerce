import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { ProductsDataService } from 'src/app/shared/product-data.service';
import { Product } from '../product.model';

@Injectable({ providedIn: 'root' })
export class ProductDetailsResolver implements Resolve<Product> {
  resolve(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<Product> | Promise<Product> | Product {
    return this.productEntityService.getById(route.paramMap.get("id")!);
  }

  constructor(private Route:ActivatedRoute, private productEntityService:ProductsDataService){}
}
