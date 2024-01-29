// types
import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
  metaData: {
    title: "داشبورد مدیریتی پیام خوان",
    description: "داشبورد مدیریتی پیام خوان",
  },
  isLoading: true,
  firebaseToken: null,
  allStates: null,
};

// ==============================|| SLICE - PAGE ||============================== //

const page = createSlice({
  name: "page",
  initialState,
  reducers: {
    setMetaData(state, action) {
      state.metaData = action.payload;
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setFirebaseToken(state, action) {
      state.firebaseToken = action.payload;
    },
    setAllStates(state, action) {
      state.allStates = action.payload;
    },
  },
});

export default page.reducer;

export const {
  setMetaData,
  setIsLoading,
  setFirebaseToken,
  setAllStates,
} = page.actions;
