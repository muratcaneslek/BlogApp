import { configureStore } from "@reduxjs/toolkit";
import blogReducer from './redux/blog-slice';

export const store = configureStore({
    reducer: {
      blog: blogReducer,
    },
  });