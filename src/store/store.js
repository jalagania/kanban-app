import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./dataSlice";
import sidebarSlice from "./sidebarSlice";
import deleteModalSlice from "./deleteModalSlice";
import taskModalSlice from "./taskModalSlice";

export const store = configureStore({
  reducer: {
    data: dataSlice.reducer,
    sidebar: sidebarSlice.reducer,
    deleteModal: deleteModalSlice.reducer,
    taskModal: taskModalSlice.reducer,
  },
});
