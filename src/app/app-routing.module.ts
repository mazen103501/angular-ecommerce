import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ProductDetailsResolver } from './products/product-detail/product-resolver.service';
import { ProductsComponent } from './products/products.component';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  {
    path:"products",
    component:ProductsComponent,
    canActivate: [AuthGuard],
  },
  {
    path:"products/:id",
    component:ProductDetailComponent,
    resolve:[ProductDetailsResolver]
  },
  {
    path:"login",
    component: LoginComponent
  },
  {
    path:"cart",
    component:CartComponent,
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
