import { createSlice } from "@reduxjs/toolkit";
import storage from "../utils/Storage";

export const savesSlice = createSlice({
  name: "saves",
  initialState: {
    saves: storage.get("saves") ?? [],
  },
  reducers: {
    addLib: (state, action) => {
      const saves = storage.get("saves");
      saves.push(action.payload);
      storage.set("saves", saves);
      state.saves = saves;
    },
    removeLib: (state, action) => {
      const saves = storage.get("saves");
      const filteredSaves = saves.filter(
        (save) => save._id !== action.payload._id
      );
      storage.set("saves", filteredSaves);
      state.saves = filteredSaves;
    },
    removeAll: (state) => {
      storage.set("saves", []);
      state.saves = [];
    },
  },
});

export const { addLib, removeLib, removeAll } = savesSlice.actions;

export default savesSlice.reducer;
