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
      state.appData[index].tasks = [];
    },

    setSubtaskStatus: (state, action) => {
      const [task, subIndex] = action.payload;
      state.appData
        .filter((board) => board.name === task.board)[0]
        .tasks.filter((t) => t.title === task.title)[0].subtasks[
        subIndex
      ].isCompleted = !state.appData
        .filter((board) => board.name === task.board)[0]
        .tasks.filter((t) => t.title === task.title)[0].subtasks[subIndex]
        .isCompleted;
    },

    setTaskStatus: (state, action) => {
      const [task, status] = action.payload;
      state.appData
        .filter((board) => board.name === task.board)[0]
        .tasks.filter((t) => t.title === task.title)[0].status = status;
    },
  },
});

export default dataSlice;
