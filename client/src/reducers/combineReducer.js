import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "../slices/authSlice";
import userReducer from "../slices/userSlice";
import cartReducer from "../slices/cartSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  user:userReducer
});

export default rootReducer;