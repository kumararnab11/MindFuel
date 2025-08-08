import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
  signUpData:null
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setToken(state, value) {
      state.token = value.payload;
      localStorage.setItem("token", JSON.stringify(value.payload));
    },
    removeToken(state){
      state.token = null;
      localStorage.removeItem("token");
    },
    setSignupData(state,action){
      state.signUpData=action.payload
    }
  },
});

export const { setToken,removeToken,setSignupData } = authSlice.actions;

export default authSlice.reducer;