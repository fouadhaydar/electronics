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
    refreshToken: (state, action: PayloadAction<string>) => {
      console.log(state);
      state.token = action.payload;
      console.log(state);
    },
  },
});

export const { setUserCredentials, logOut, refreshToken } = userSlice.actions;
export default userSlice.reducer;
