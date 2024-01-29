// types
import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
  info: { token: null, visitor: null },
};

// ==============================|| SLICE - VISITOR ||============================== //

const visitor = createSlice({
  name: "visitor",
  initialState,
  reducers: {
    setVisitorInfo(state, action) {
      state.info = action.payload;
    },
  },
});

export default visitor.reducer;

export const { setVisitorInfo } = visitor.actions;
