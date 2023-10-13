import { configureStore, combineReducers } from "@reduxjs/toolkit";

import savesReducer from "../slices/savesSlice";
import responsesReducer from "../slices/responsesSlice";

const rootReducer = combineReducers({
  saves: savesReducer,
  responses: responsesReducer,
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
    responses: responsesReducer,
  },
});

export default store;
