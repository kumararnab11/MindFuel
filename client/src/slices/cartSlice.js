import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
  items: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  totalItems: localStorage.getItem("totalItems")
    ? JSON.parse(localStorage.getItem("totalItems"))
    : 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add to Cart (unique product count only)
    addToCart(state, action) {
      const item = action.payload; // {id, image, price, instructor,name}
      const exists = state.items.find((i) => i.id === item.id);

      if (exists) {
        toast.error(`${item.name} is already in cart`);
      } else {
        state.items.push({ ...item});
        state.totalItems = state.items.length;
        toast.success(`${item.name} added to cart`);
      }

      localStorage.setItem("cartItems", JSON.stringify(state.items));
      localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
    },

    // Remove product completely
    removeFromCart(state, action) {
      const id = action.payload;
      const removedItem = state.items.find((i) => i.id === id);

      if (removedItem) {
        state.items = state.items.filter((i) => i.id !== id);
        state.totalItems = state.items.length;
        toast.success(`${removedItem.name} removed from cart`);
      }

      localStorage.setItem("cartItems", JSON.stringify(state.items));
      localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
    },

    // Reset Cart
    resetCart(state) {
      state.items = [];
      localStorage.removeItem("cartItems");
      localStorage.removeItem("totalItems");
      toast.success("Cart has been reset");
    },
  },
});

export const { addToCart, removeFromCart, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
