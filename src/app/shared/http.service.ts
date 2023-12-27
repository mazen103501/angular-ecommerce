import { Injectable }from "@angular/core";
import { HttpClient} from "@angular/common/http"
import { Cart } from "../cart/cart.model";
import { map, reduce } from "rxjs";
@Injectable({providedIn:"root"})
export class HttpService {
  constructor(private http:HttpClient){}

  LoginRequest(email: string,password: string){
    return this.http.post("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBqbSLLPSH3eVCgEO-Biid6gOmrSwu41OE",
      {
        email,
        password,
        returnSecureToken: true,
      }
    )
  }
  RegisterRequest(email:string,password:string){
    return this.http.post("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBqbSLLPSH3eVCgEO-Biid6gOmrSwu41OE",{
      email,
      password,
      returnSecureToken: true
    })
  }

  updateCartItem(product:Cart){
    return this.http.put(`https://angular-e-com-default-rtdb.europe-west1.firebasedatabase.app/cart/${product.key}.json`,product)
  }

  getCartItemsCount(){
    return this.http.get<any>("https://angular-e-com-default-rtdb.europe-west1.firebasedatabase.app/cart.json").pipe(
      reduce((prev,curr)=> {
        let total = 0
        for (const key in curr) {
          total += curr[key].amount;
        }
        return (prev + total)
      },0)
    )
  }
  // getProduct(){
  //   this.http.get("https://angular-e-com-default-rtdb.europe-west1.firebasedatabase.app/products.json").subscribe((d:any)=>{
  //     const keys:string[] = Object.keys(d);
  //     const arr:{}[] = []
  //     // console.log(d[keys[0]]);
  //     keys.forEach((key:string)=>{
  //       arr.push({...d[key],key});
  //     })
  //     // console.log(arr);
  //   });
  // }
}

