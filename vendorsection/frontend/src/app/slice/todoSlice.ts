import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchJsonPlaceholderStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchJsonPlaceholderListSuccess: (state, action) => {
      state.list = action.payload;
      state.loading = false;
    },
    addJsonPlaceholderVendorSuccess: (state, action) => {
      // @ts-ignore
      state.list.push(action.payload);
    },
    deleteJsonPlaceholderVendorSuccess: (state, action) => {
      state.list = state.list.filter((todo: any) => todo.id !== action.payload);
    },
    fetchJsonPlaceholderError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  fetchJsonPlaceholderStart,
  fetchJsonPlaceholderListSuccess,
  addJsonPlaceholderVendorSuccess,
  deleteJsonPlaceholderVendorSuccess,
  fetchJsonPlaceholderError,
} = todoSlice.actions;

export default todoSlice.reducer;
