// types
import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
  auth: { token: null, adminInfo: null, isAuthenticated: false },
};

// ==============================|| SLICE - CUSTOMER ||============================== //

const customerAuth = createSlice({
  name: "customerAuth",
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

export default customerAuth.reducer;

export const { setAuth, setLogOut } = customerAuth.actions;
