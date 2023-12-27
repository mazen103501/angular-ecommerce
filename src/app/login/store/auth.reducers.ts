import { createReducer, on } from "@ngrx/store"
import { authFail, authStart, authSuccess, logout } from "./auth.actions"



export interface AppState {
  auth:{}
};
export interface AuthState{
  user:{} | null;
  authFail: string| null;
  loading: boolean;
};
const initialState:AuthState = {
  user:null,
  authFail:null,
  loading:false
};

export const authReducer = createReducer(
  initialState,
  on(authStart,(state)=>{
    return {
      ...state,
      loading:true
    }
  }),
  on(authSuccess,(state,action)=>({
    ...state,
    user:action.user,
    authFail: null,
    loading:false
  })),
  on(logout,(state)=>({
    ...state,
    user:null
  })),
  on(authFail,(state,action)=>{
    return {
      ...state,
      authFail:action.message,
      loading:false
    }
  }),
);
