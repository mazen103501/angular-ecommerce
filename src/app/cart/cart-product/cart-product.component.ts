import { Component, Input, OnInit } from '@angular/core';
import { Update } from '@ngrx/entity';
import { CartDataService } from 'src/app/shared/cart-data.service';
import { CartEntityService } from 'src/app/shared/cart-entity.service';
import { HttpService } from 'src/app/shared/http.service';
import { Cart } from '../cart.model';

@Component({
  selector: 'app-cart-product',
  templateUrl: './cart-product.component.html',
  styleUrls: ['./cart-product.component.scss']
})
export class CartProductComponent implements OnInit {
  @Input() product: any;
  amount:number;
  constructor(private http:HttpService,private cartService:CartEntityService) { }

  ngOnInit(): void {
    this.amount = this.product.amount;
  }

  increase(){
    this.amount++;
    const updatedItem:Cart = {...this.product,amount:this.amount}
    // console.log(updatedItem);

    this.cartService.update(updatedItem);
    // this.http.updateCartItem(updatedItem).subscribe(res=>{
    //   this.cartDataService.getAll().subscribe();
    // });
  }
  decrease(){
    this.amount--;
    if(this.amount == 0){
      console.log("delete");
      this.cartService.delete(this.product.key);
    }else{
      const updatedItem:Cart = {...this.product,amount:this.amount}
      // console.log(updatedItem);
      this.cartService.update(updatedItem);

    }
    this.cartService.getAll();
  }
}
