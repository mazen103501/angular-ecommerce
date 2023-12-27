import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./auth.reducers";

export const selectAuthState= createFeatureSelector<AuthState>("auth");

export const loggedIn = createSelector(
  selectAuthState,
  (auth)=> auth.user
);

export const authFailSelector = createSelector(
  selectAuthState,
  (auth) => auth.authFail
)

export const authLoading = createSelector(
  selectAuthState,
  (auth)=> auth.loading
)
