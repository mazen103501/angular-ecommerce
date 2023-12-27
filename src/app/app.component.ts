import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { select } from '@ngrx/store';
import { authSuccess } from './login/store/auth.actions';
import { AppState } from './login/store/auth.reducers';
import { loggedIn } from './login/store/auth.selectors';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private store:Store<AppState>,private router:Router){}
  isLoggedIn:boolean;
  ngOnInit(): void {
    const theUser = JSON.parse(localStorage.getItem("user")!);
    if(theUser){
      this.store.dispatch(authSuccess({user:theUser}))
      // this.router.navigate(["/"])
    }else{
      this.router.navigate(["/login"])
    }

  }
}
