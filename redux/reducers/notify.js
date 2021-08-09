import { createSlice } from "@reduxjs/toolkit";

export const NOTIFY_TYPES = {
  INFO: "info",
  ERROR: "error",
  SUCCESS: "success",
};

export const notifySlice = createSlice({
  name: "notify",
  initialState: {
    show: false,
    msg: "",
    type: NOTIFY_TYPES.INFO,
  },
  reducers: {
    updateNotify: (state, action) => {
      (state.show = !state.show),
        (state.msg = action.payload?.msg ? action.payload?.msg : "");
      state.type = action.payload?.type
        ? action.payload?.type
        : NOTIFY_TYPES.INFO;
    },
  },
});

export const { updateNotify } = notifySlice.actions;
export default notifySlice.reducer;
