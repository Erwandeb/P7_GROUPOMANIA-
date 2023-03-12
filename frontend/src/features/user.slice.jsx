import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
  },
  reducers: {
    setUserData: (state, { payload: { token, userId } }) => {
      state.userData = { token, userId };
    },
    logout: (state) => {
      state.userData = null;
    },
  },
});

export const { setUserData, logout } = userSlice.actions;
export default userSlice.reducer;