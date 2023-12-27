import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Cart } from 'src/app/cart/cart.model';
import { CartEntityService } from 'src/app/shared/cart-entity.service';
import { ProductsDataService } from 'src/app/shared/product-data.service';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product:Product;
  constructor(private productEntityService:ProductsDataService,private activatedRoute:ActivatedRoute,private cartEntityService:CartEntityService) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data=>{
      this.product = {...data["0"],key:this.activatedRoute.snapshot.params["id"]};
    })
  }

  addToCart(){
    // const cartItem:Cart = {...this.product}
    this.cartEntityService.add(this.product);
  }
}
