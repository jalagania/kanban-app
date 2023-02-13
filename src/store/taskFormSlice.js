import { createSlice } from "@reduxjs/toolkit";

const taskFormSlice = createSlice({
  name: "taskFormModal",
  initialState: {
    taskFormModal: "",
    taskFormModalVisible: false,
  },
  reducers: {
    setShowTaskFormModal: (state, action) => {
      state.taskFormModalVisible = action.payload[0];
      state.taskFormModal = action.payload[1];
    },
  },
});

export default taskFormSlice;
