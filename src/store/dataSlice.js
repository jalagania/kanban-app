import { createSlice } from "@reduxjs/toolkit";
import { data } from "../data";

const dataSlice = createSlice({
  name: "appData",
  initialState: {
    appData: data,
  },
  reducers: {},
});

export default dataSlice;
