import { createSlice } from "@reduxjs/toolkit";

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: {
    sidebarHidden: false,
    mobileSidebarHidden: true,
    darkMode: window.matchMedia("(prefers-color-scheme: dark)").matches,
  },
  reducers: {
    setSidebarHidden: (state, action) => {
      state.sidebarHidden = action.payload;
    },

    setMobileSidebarHidden: (state, action) => {
      state.mobileSidebarHidden = action.payload;
    },

    setDarkMode: (state, action) => {
      state.darkMode = action.payload;
    },
  },
});

export default sidebarSlice;
