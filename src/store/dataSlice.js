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

    deleteBoard: (state, action) => {
      const index = state.appData.findIndex(
        (board) => board.name === action.payload
      );
      state.appData[index].columns = [];
    },
  },
});

export default dataSlice;
