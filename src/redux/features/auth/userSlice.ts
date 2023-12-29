import { PayloadAction, createSlice } from "@reduxjs/toolkit";
interface Auth {
  email: string | null;
  token: string | null;
}

const initialState: Auth = {
  email: null,
  token: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserCredentials: (
      state,
      action: PayloadAction<{ email: string; token: string }>
    ) => {
      const { email, token } = action.payload;
      state.email = email;
      state.token = token;
    },
    logOut: (state) => {
      state.email = null;
      state.token = null;
    },
  },
});

export const { setUserCredentials, logOut } = userSlice.actions;
export default userSlice.reducer;
