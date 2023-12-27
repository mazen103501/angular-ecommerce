import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {DefaultDataService, HttpUrlGenerator} from "@ngrx/data"
import { Product } from "../products/product.model";
import { map, Observable } from "rxjs";
@Injectable({providedIn:"root"})
export class ProductsDataService extends DefaultDataService<Product>{
  constructor(http:HttpClient,httpUrlGenerator:HttpUrlGenerator){
    super("Products",http,httpUrlGenerator)
  }
  override getAll(): Observable<Product[]>{
    return this.http.get("https://angular-e-com-default-rtdb.europe-west1.firebasedatabase.app/products.json").pipe(
      map((d:any)=>{
        const keys:string[] = Object.keys(d);
        const arr:Product[] = []
        keys.forEach((key:string)=>{
          arr.push({...d[key],key});
        })
        return arr;
      })
    )
  }
  override getById(key:string): Observable<Product>{
    return this.http.get<Product>(`https://angular-e-com-default-rtdb.europe-west1.firebasedatabase.app/products/${key}.json`);
  }
}

