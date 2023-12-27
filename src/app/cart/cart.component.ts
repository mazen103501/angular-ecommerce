import { Component, OnInit } from '@angular/core';
import { CartDataService } from '../shared/cart-data.service';
import { CartEntityService } from '../shared/cart-entity.service';
import { Cart } from './cart.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems:Cart[] = [];
  totalPrice:number =0;
  loaded:boolean = false;
  constructor(private cartEntityService:CartEntityService) { }

  ngOnInit(): void {
    this.cartEntityService.loaded$.subscribe(loaded=>{
      this.loaded = loaded;
      if(loaded){
        this.cartEntityService.entities$.subscribe(arr=>{
          this.cartItems = arr;
          let sum:number=0;
          this.cartItems.forEach(e=>{
            sum += (e.amount! * e.price )
            // console.log(sum);

          })
          this.totalPrice = +sum.toFixed(2)
          console.log(this.totalPrice);
        })
      }
    })
    if(!this.loaded){
      this.cartEntityService.getAll().subscribe(data=>{
        this.cartItems = data;
      });
    }


  }

}
