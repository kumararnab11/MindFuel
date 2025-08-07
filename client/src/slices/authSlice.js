import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
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
    }
  },
});

export const { setToken,removeToken } = authSlice.actions;

export default authSlice.reducer;