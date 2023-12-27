import { Injectable } from "@angular/core";
import { EntityCollectionServiceBase,EntityCollectionServiceElementsFactory } from "@ngrx/data"
import { Product } from "../products/product.model";

@Injectable({providedIn:"root"})
export class ProductEntityService extends EntityCollectionServiceBase<Product>{
  constructor(serviceElementsFactory:EntityCollectionServiceElementsFactory){
    super("Products",serviceElementsFactory)
  }
}
