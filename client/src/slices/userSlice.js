import { createSlice } from "@reduxjs/toolkit";

// Initialize state from localStorage if available
const initialState = {
  user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    deleteUser(state) {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

export const { setUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;
