import { configureStore } from "@reduxjs/toolkit";
import notifyReducer from "../slice/notify";
import authReducer from "../slice/auth";
import dashboardReducer from "../slice/dashboard";

export default configureStore({
  reducer: {
    notify: notifyReducer,
    auth: authReducer,
    dashboard: dashboardReducer,
  },
});
