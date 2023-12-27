import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions ,createEffect, ofType} from "@ngrx/effects";
import { catchError, of, switchMap, tap } from "rxjs";
import { HttpService } from "src/app/shared/http.service";
import { authFail, authStart, authSuccess } from "./auth.actions";

@Injectable({providedIn:"root"})
export class AuthEffects{
  login$ = createEffect(() =>
    this.actions$.pipe(
        ofType(authStart),
        switchMap(action => {
          let request;
          if(action.login){
            request =  this.httpService.LoginRequest(action.email,action.password);
          }else{
            request = this.httpService.RegisterRequest(action.email,action.password);
          }
          return request.pipe(
            switchMap((user) => of(authSuccess({user}))),
            tap(payload=>{
              const convertedUser = JSON.stringify(payload.user);
              this.router.navigate(["/"])
              localStorage.setItem("user",convertedUser)
            }),
            catchError(err=>{
              // alert(err.error.error.message);
              return of(authFail({message:err.error.error.message}));
            })
          )
      }
        )
    )
  );

  constructor(private actions$:Actions,private httpService:HttpService,private router:Router){
  }
}
