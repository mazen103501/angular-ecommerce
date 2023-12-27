import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { logout } from '../login/store/auth.actions';
import { AppState } from '../login/store/auth.reducers';
import { loggedIn } from '../login/store/auth.selectors';
import { CartEntityService } from '../shared/cart-entity.service';
import { HttpService } from '../shared/http.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  navOpen:boolean= false;
  isLoggedIn: boolean = false;
  cartItemsCounter:number;
  constructor(private store:Store<AppState>,private router:Router,private cartEntityService:CartEntityService, private httpService:HttpService) { }

  ngOnInit(): void {
    this.store.select(loggedIn).subscribe(logStatus=>{
      this.isLoggedIn = !!logStatus
    })
    this.httpService.getCartItemsCount().subscribe(totalNumber=>this.cartItemsCounter = totalNumber);
    this.cartEntityService.entities$.subscribe(data=>{
      this.cartItemsCounter = data.reduce((prev,curr)=>(prev+curr.amount!),0)
    })
    // this.httpService.getProduct();
  }
  logout(){
    this.store.dispatch(logout());
    this.router.navigate(["/login"])
    localStorage.removeItem("user")
  }
  changeNavBarMode(){
    this.navOpen = !this.navOpen
  }
  navBlur(){
    this.changeNavBarMode()
  }
}
