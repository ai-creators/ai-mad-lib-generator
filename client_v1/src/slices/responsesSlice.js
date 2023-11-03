import { createSlice } from "@reduxjs/toolkit";
import storage from "../utils/Storage";

export const responsesSlice = createSlice({
  name: "responses",
  initialState: {
    responses: storage.get("responses") ?? [],
  },
  reducers: {
    addResponse: (state, action) => {
      const responses = storage.get("responses") ?? [];
      responses.push(action.payload);
      storage.set("responses", responses);
      state.responses = responses;
    },
    setAllResponses: (state, action) => {
      storage.set("responses", action.payload);
      state.responses = action.payload;
    },
    removeResponse: (state, action) => {
      const responses = storage.get("responses") ?? [];
      const filteredResponses = responses.filter(
        (save) => save._id !== action.payload._id
      );
      storage.set("responses", filteredResponses);
      state.responses = filteredResponses;
    },
    removeAllResponses: (state) => {
      storage.set("responses", []);
      state.responses = [];
    },
  },
});

export const {
  addResponse,
  removeResponse,
  setAllResponses,
  removeAllResponses,
} = responsesSlice.actions;

export default responsesSlice.reducer;
