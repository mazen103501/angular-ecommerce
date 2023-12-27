import { Injectable } from "@angular/core";
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from "@ngrx/data"
import { Cart } from "../cart/cart.model";

@Injectable({providedIn:"root"})
export class CartEntityService extends EntityCollectionServiceBase<Cart>{
  constructor(serviceElementsFactory:EntityCollectionServiceElementsFactory){
    super("Cart",serviceElementsFactory)
  }
}
