import { createSlice } from "@reduxjs/toolkit";

const taskModalSlice = createSlice({
  name: "taskModal",
  initialState: {
    taskModalVisible: false,
    taskInfo: {},
  },
  reducers: {
    setShowTaskModal: (state, action) => {
      state.taskModalVisible = action.payload;
    },

    setTaskInfo: (state, action) => {
      state.taskInfo = { ...action.payload };
    },
  },
});

export default taskModalSlice;
