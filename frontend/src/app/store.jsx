import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/user.slice";

export default configureStore({
  reducer: {
    user: userSlice,
  },
});