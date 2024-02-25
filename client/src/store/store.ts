import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "@/slices/userSlice";
import globaErrorReducer from "@/slices/globalErrorSlice";

const rootReducer = combineReducers({
  user: userReducer,
  globalError: globaErrorReducer,
});

export function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
