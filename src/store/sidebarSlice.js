import { createSlice } from "@reduxjs/toolkit";

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: {
    sidebarHidden: false,
    darkMode: false,
  },
  reducers: {
    setSidebarHidden: (state, action) => {
      state.sidebarHidden = action.payload;
    },

    setDarkMode: (state, action) => {
      state.darkMode = action.payload;
    },
  },
});

export default sidebarSlice;
