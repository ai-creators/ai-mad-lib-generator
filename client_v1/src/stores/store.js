import { configureStore } from "@reduxjs/toolkit";

import savesReducer from "../slices/savesSlice";

const store = configureStore({
  reducer: {
    saves: savesReducer,
  },
});

export default store;
