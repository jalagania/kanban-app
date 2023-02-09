import { createSlice } from "@reduxjs/toolkit";

const deleteModalSlice = createSlice({
  name: "deleteModal",
  initialState: {
    deleteModal: "",
    deleteModalVisible: false,
  },
  reducers: {
    setShowDeleteModal: (state, action) => {
      state.deleteModalVisible = action.payload[0];
      state.deleteModal = action.payload[1];
    },
  },
});

export default deleteModalSlice;
