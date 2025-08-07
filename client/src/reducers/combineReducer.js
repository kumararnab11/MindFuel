import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "../slices/authSlice";
import userReducer from "../slices/userSlice";
import cartReducer from "../slices/cartSlice";
import loaderReducer from "../slices/loaderSlice"

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  user:userReducer,
  loader:loaderReducer,
});

export default rootReducer;