import { configureStore } from "@reduxjs/toolkit";
import notifyReducer from "../reducers/notify";

export default configureStore({
  reducer: {
    notify: notifyReducer,
  },
});
