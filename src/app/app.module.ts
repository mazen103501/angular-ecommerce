import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from "@angular/forms"
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { authReducer } from './login/store/auth.reducers';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './login/store/auth.effects';
import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './products/product/product.component';
import { EntityDataModule,EntityDataService } from '@ngrx/data';
import { EntityMetadataMap } from '@ngrx/data';
import { EntityDefinitionService } from '@ngrx/data';
import { ProductsDataService } from './shared/product-data.service';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { CartComponent } from './cart/cart.component';
import { CartProductComponent } from './cart/cart-product/cart-product.component';
import { CartDataService } from './shared/cart-data.service';
import { Cart } from './cart/cart.model';


export const appEntityMetadata: EntityMetadataMap = {
  Products: {
    sortComparer:compareCourses
  },
  Cart:{
    selectId:(cart:Cart)=> cart.key
  }
};

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    ProductsComponent,
    ProductComponent,
    ProductDetailComponent,
    CartComponent,
    CartProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    StoreModule.forRoot({auth: authReducer}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([AuthEffects]),
    EntityDataModule.forRoot({
    entityMetadata: appEntityMetadata,
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private eds:EntityDefinitionService,private entityDataService:EntityDataService,private productsDataService:ProductsDataService,private cartDataService:CartDataService){
    eds.registerMetadataMap(appEntityMetadata)
    entityDataService.registerService("Products",productsDataService)
    entityDataService.registerService("Cart",cartDataService)
  }
}




export function compareCourses(c1:any, c2:any) {

  const compare = c1.id - c2.id;

  if (compare > 0) {
    return 1;
  }
  else if ( compare < 0) {
    return -1;
  }
  else return 0;

}
