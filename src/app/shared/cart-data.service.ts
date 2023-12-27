import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {DefaultDataService, HttpUrlGenerator} from "@ngrx/data";
import { map, Observable, of } from "rxjs";
import { Cart } from "../cart/cart.model";
import { Product } from "../products/product.model";
import { Update } from '@ngrx/entity';
@Injectable({providedIn:"root"})
export class CartDataService extends DefaultDataService<Cart>{
  constructor(http:HttpClient,httpUrlGenerator:HttpUrlGenerator){
    super("Cart",http,httpUrlGenerator)
  }
  override getAll(): Observable<Cart[]>{
    return this.http.get("https://angular-e-com-default-rtdb.europe-west1.firebasedatabase.app/cart.json").pipe(
      map((d:any)=>{
        const keys:string[] = Object.keys(d);
        const arr:Cart[] = []
        keys.forEach((key:string)=>{
          arr.push({...d[key],key});
        })
        return arr;
      })
    )
  }
  override add(product:Product):Observable<Cart>{
    const newItem:Cart = {...product,amount:1}
    return this.http.put<Cart>(`https://angular-e-com-default-rtdb.europe-west1.firebasedatabase.app/cart/${newItem.key}.json`,newItem);
  }

  override delete(key:string):Observable<string|number>{
    return this.http.delete<string | number>(`https://angular-e-com-default-rtdb.europe-west1.firebasedatabase.app/cart/${key}.json`).pipe(
      map(data=>{
        return key
      })
    )
  }
  override update(item: Update<Cart>):Observable<Cart>{
    return this.http.put<Cart>(`https://angular-e-com-default-rtdb.europe-west1.firebasedatabase.app/cart/${item.changes.key}.json`,{...item.changes})
  }

}

