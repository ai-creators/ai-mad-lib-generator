import { configureStore, combineReducers } from "@reduxjs/toolkit";

import savesReducer from "../slices/savesSlice";

const rootReducer = combineReducers({
  saves: savesReducer,
});

export function setupStore(preloadedState) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}

const store = configureStore({
  reducer: {
    saves: savesReducer,
  },
});

export default store;
