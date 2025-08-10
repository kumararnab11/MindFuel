import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "../slices/authSlice";
import userReducer from "../slices/userSlice";
import cartReducer from "../slices/cartSlice";
import loaderReducer from "../slices/loaderSlice"
import courseReducer from "../slices/courseSlice"

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  user:userReducer,
  loader:loaderReducer,
  course:courseReducer
});

export default rootReducer;