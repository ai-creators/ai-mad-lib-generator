import { UserModel } from "@/models/UserModel";
import { storage } from "@/utils/Storage";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface UserState {
  user: UserModel;
}

const initialState: UserState = {
  user: {
    id: storage.get("userId") ?? null,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserModel>) => {
      storage.set("userId", action.payload.id ?? null);
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
