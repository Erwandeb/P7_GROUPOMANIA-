import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
  },
  reducers: {
    setUserData: (state, { token }) => {
      state.userData = token;
    },
    logout: (state) => {
      state.userData = null;
    },
  },
});

export const { setUserData, logout } = userSlice.actions;
export default userSlice.reducer;