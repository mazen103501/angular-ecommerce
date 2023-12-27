import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import {Observable ,take,map} from 'rxjs'
import { AppState } from '../login/store/auth.reducers';
import { Store } from '@ngrx/store';
@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(private store:Store<AppState>) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | Observable<boolean>
    | Promise<boolean> {
    return this.store.select('auth').pipe(
      take(1),
      map((authState:any) => authState.user),
      map((user) => {
        const auth = !!user;
        if (auth) {
          return true;
        }

        return false;
      })
    );
  }
}
