import { createAction, props } from '@ngrx/store';

export const authStart = createAction(
  "[Auth Start] Auth",
  props<{email:string,password:string,login:boolean}>()
);

export const authSuccess = createAction(
  "[Auth Success] Auth",
  props<{user:any}>()
);

export const logout = createAction(
  "[Logout] Auth"
);



export const authFail = createAction(
  "[Fail] Auth",
  props<{message:string}>()
);

// export const signup = createAction(
//   "[Sign Up] Auth",
//   props<{email:string,password:string}>()
// );
