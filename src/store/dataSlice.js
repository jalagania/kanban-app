import { createSlice } from "@reduxjs/toolkit";
import { data } from "../data";

const dataSlice = createSlice({
  name: "appData",
  initialState: {
    appData: data,
    selectedBoard: data[0].name,
  },
  reducers: {
    setSelectedBoard: (state, action) => {
      state.selectedBoard = action.payload;
    },
  },
});

export default dataSlice;
