import { configureStore } from "@reduxjs/toolkit";
import CartSliceSliceReducer from "./features/product-slice";
import ManufacturerSliceReducer from "./features/manufacturer-silce";
import userSliceReducer from "./features/auth/userSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    CartSliceSliceReducer,
    ManufacturerSliceReducer,
    user: userSliceReducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useSelectore: TypedUseSelectorHook<RootState> = useSelector;
