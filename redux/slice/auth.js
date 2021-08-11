import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: "",
    loggedIn: false,
  },
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
    },
    addToken: (state, action) => {
      state.token = action.payload;
    },
    setLoginState: (state, action) => {
      state.loggedIn = action.payload;
    },
  },
});

export const { addUser, addToken, setLoginState } = authSlice.actions;

export default authSlice.reducer;
