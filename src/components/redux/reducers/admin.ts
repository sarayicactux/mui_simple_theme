// types
import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
  auth: { token: null, adminInfo: null, isAuthenticated: false },
};

// ==============================|| SLICE - CUSTOMER ||============================== //

const adminAuth = createSlice({
  name: "adminAuth",
  initialState,
  reducers: {
    setAuth(state, action) {
      state.auth = action.payload;
    },
    setLogOut(state, action) {
      state.auth = initialState.auth;
    },
  },
});

export default adminAuth.reducer;

export const { setAuth, setLogOut } = adminAuth.actions;
