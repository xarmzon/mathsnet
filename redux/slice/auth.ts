import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// const loadLocalData = createAsyncThunk("user/loader", async () => {

//   return;
// })

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: "",
    loggedIn: false,
    loading: true,
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
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { addUser, addToken, setLoginState, setLoading } =
  authSlice.actions;

export default authSlice.reducer;
