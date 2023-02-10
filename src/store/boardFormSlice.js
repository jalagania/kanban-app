import { createSlice } from "@reduxjs/toolkit";

const boardFormSlice = createSlice({
  name: "boardFormModal",
  initialState: {
    boardFormModal: "",
    boardFormModalVisible: false,
  },
  reducers: {
    setShowBoardFormModal: (state, action) => {
      state.boardFormModalVisible = action.payload[0];
      state.boardFormModal = action.payload[1];
    },
  },
});

export default boardFormSlice;
