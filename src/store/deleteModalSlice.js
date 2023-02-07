import { createSlice } from "@reduxjs/toolkit";

const deleteModalSlice = createSlice({
  name: "deleteModal",
  initialState: {
    deleteModalVisible: false,
  },
  reducers: {
    setShowDeleteModal: (state, action) => {
      state.deleteModalVisible = action.payload;
    },
  },
});

export default deleteModalSlice;
