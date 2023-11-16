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
    removeFromeCart: (
      state,
      action: PayloadAction<{ id: string; price: number }>
    ) => {
      state.cart = state.cart.filter(
        (product) => product.variationId != action.payload.id
      );
      state.totalePrice -= action.payload.price;
    },
  },
});

export const { addToCart, removeFromeCart } = CartSlice.actions;
export default CartSlice.reducer;
