import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { authStart } from './store/auth.actions';
import { AppState } from './store/auth.reducers';
import { authFailSelector, authLoading, loggedIn } from './store/auth.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  mode:boolean = true;
  constructor(private store : Store<AppState>) { }
  signupForm:FormGroup;
  loginForm:FormGroup;

  errorMessage: null | string;
  loading : boolean = false;

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      email: new FormControl("",[Validators.email,Validators.required]),
      password: new FormControl("",[Validators.required]),
    })
    this.loginForm = new FormGroup({
      email: new FormControl("",[Validators.email,Validators.required]),
      password: new FormControl("",[Validators.required]),
    })
    this.store.select(authFailSelector).subscribe(errMessage=>{
      this.errorMessage = errMessage;
    })
    this.store.select(authLoading).subscribe(loadingState=>{
      this.loading = loadingState;
    })
  }
  changeMode(){
    this.mode = !this.mode;
    this.signupForm.reset();
    this.loginForm.reset();
  }
  loginUser(){
    // this.store.dispatch(login({email:"12312",password:"12313"}))
  }
  onSubmit(mode:boolean){
    let email;
    let password;
    let login;
    if(mode){
      email = this.loginForm.value.email;
      password = this.loginForm.value.password;
      login = true;
    }else{
      email = this.signupForm.value.email;
      password = this.signupForm.value.password;
      login = false;
    }
    console.log(email,password);
    this.store.dispatch(authStart({email,password,login}))
  }

}
