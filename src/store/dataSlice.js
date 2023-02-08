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

    setSubtaskStatus: (state, action) => {
      const [task, subIndex] = action.payload;
      state.appData
        .filter((board) => board.name === task.board)[0]
        .columns.filter((column) => column.name === task.column)[0].tasks[
        task.index
      ].subtasks[subIndex].isCompleted = !state.appData
        .filter((board) => board.name === task.board)[0]
        .columns.filter((column) => column.name === task.column)[0].tasks[
        task.index
      ].subtasks[subIndex].isCompleted;
    },
  },
});

export default dataSlice;
