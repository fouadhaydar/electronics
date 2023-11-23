"use client";
import { setProductInLocalStoage } from "@/functions/LocalStorageFunctions";
import { ProductInCart } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// interface Product {
//   name: string;
//   id: string;
//   price: number;
//   quantity: number;
//   options: {
//     [key: string]: any;
//   };
// }

interface InitialState {
  cart: ProductInCart[];
  totalePrice: number;
}
// const getProductsFromLocalStorage = (): ProductInCart[] | null => {
//   if (localStorage) {
//     const data = localStorage.getItem("products");
//     return data ? JSON.parse(data) : null;
//   }
//   return null;
// };

const initialState: InitialState = {
  cart: [],
  totalePrice: 0,
};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ProductInCart>) => {
      // const id = action.payload.variationId;
      state.cart.push(action.payload);
      state.totalePrice += action.payload.price;
    },
    setCartFromLocalStorage: (
      state,
      action: PayloadAction<{ data: ProductInCart[]; price: number }>
    ) => {
      // console.log("inside redux");
      state.cart = [...action.payload.data];
      state.totalePrice = action.payload.price;
    },
    removeFromeCart: (
      state,
      action: PayloadAction<{ id: string; price: number }>
    ) => {
      state.cart = state.cart.filter(
        (product) => product.variationId != action.payload.id
      );
      state.totalePrice -= action.payload.price;
      localStorage.setItem("products", JSON.stringify(state.cart));
      localStorage.setItem("totalPrice", JSON.stringify(state.totalePrice));
    },
    clearCart: (state) => {
      state.cart = [];
      state.totalePrice = 0;
      localStorage.clear();
    },
  },
});

export const {
  addToCart,
  removeFromeCart,
  setCartFromLocalStorage,
  clearCart,
} = CartSlice.actions;
export default CartSlice.reducer;
