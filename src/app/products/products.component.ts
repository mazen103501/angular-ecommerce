import { Component, OnInit } from '@angular/core';
import { ProductEntityService } from '../shared/product-entity.service';
import { Product } from './product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  productsList:Product[] = [];
  loaded:boolean = false;
  constructor(private productsEntityService:ProductEntityService) { }

  ngOnInit(): void {
    this.productsEntityService.loaded$.subscribe(loaded=>{
      this.loaded = loaded
      if(loaded){
        this.productsEntityService.entities$.subscribe(arr=>{
          this.productsList = arr
        })
      }
    })
    if(!this.loaded){
      this.productsEntityService.getAll();
    }

  }
  textEllipsis(text:string,wordNumber:number){
    if(text.length < wordNumber){
      return text
    }
    return text.split("").slice(0,wordNumber).join("") + "...";
  }

}
