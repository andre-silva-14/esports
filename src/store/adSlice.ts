import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface AdState {
  open: boolean;
  discordId: string | null;
}

const initialState: AdState = {
  open: false,
  discordId: null,
};

export const adSlice = createSlice({
  name: "ad",
  initialState,
  reducers: {
    open: (state, action: PayloadAction<string>) => {
      state.discordId = action.payload;
      state.open = true;
    },
    close: (state) => {
      state.open = false;
    },
  },
});

export const { open, close } = adSlice.actions;

//export const selectCount = (state: RootState) => state.counter.value;

export default adSlice.reducer;
