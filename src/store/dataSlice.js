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

    addBoard: (state, action) => {
      state.appData.push(action.payload);
    },

    updateBoard: (state, action) => {
      const index = state.appData.findIndex(
        (board) => board.name === state.selectedBoard
      );
      state.appData[index] = { ...state.appData[index], ...action.payload };
    },

    deleteBoard: (state, action) => {
      state.appData = state.appData.filter(
        (board) => board.name !== action.payload
      );
    },

    addTask: (state, action) => {
      const [task, taskBoard] = action.payload;
      const index = state.appData.findIndex(
        (board) => board.name === taskBoard
      );
      state.appData[index].tasks.push(task);
    },

    updateTask: (state, action) => {
      const [task, taskInfo] = action.payload;
      const boardIndex = state.appData.findIndex(
        (board) => board.name === taskInfo.board
      );
      const taskndex = state.appData[boardIndex].tasks.findIndex(
        (task) => task.title === taskInfo.title
      );
      state.appData[boardIndex].tasks[taskndex] = { ...task };
    },

    deleteTask: (state, action) => {
      const task = action.payload;
      const index = state.appData.findIndex(
        (board) => board.name === task.board
      );
      state.appData[index].tasks = state.appData[index].tasks.filter(
        (t) => t.title !== task.title
      );
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
