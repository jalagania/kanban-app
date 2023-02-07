import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./dataSlice";
import sidebarSlice from "./sidebarSlice";
import deleteModalSlice from "./deleteModalSlice";

export const store = configureStore({
  reducer: {
    data: dataSlice.reducer,
    sidebar: sidebarSlice.reducer,
    deleteModal: deleteModalSlice.reducer,
  },
});
