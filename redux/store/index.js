import { configureStore } from "@reduxjs/toolkit";
import notifyReducer from "../slice/notify";
import authReducer from "../slice/auth";

export default configureStore({
  reducer: {
    notify: notifyReducer,
    auth: authReducer,
  },
});
