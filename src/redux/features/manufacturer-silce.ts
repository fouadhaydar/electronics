import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  manufacturerid: 0,
  manufacturerName: "",
};

const manufacturerSlice = createSlice({
  name: "manufacturer",
  initialState,
  reducers: {
    setManufacturer: (state, action: PayloadAction<number>) => {
      state.manufacturerid = action.payload;
    },
    setManufacturerName: (state, action: PayloadAction<string>) => {
      state.manufacturerName = action.payload;
    },
  },
});

export const { setManufacturer, setManufacturerName } =
  manufacturerSlice.actions;
export default manufacturerSlice.reducer;
