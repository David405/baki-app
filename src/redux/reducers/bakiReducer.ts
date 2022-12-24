import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// axios.defaults.headers.common["apikey"] = config.exchangeRatesAPIKEY;
export interface State {
  address: string;
  network: any;
  totalColateral: number;
  userDebt: number;
  colBalance: number;
  colBalanceVal: number;
  rewardBal: number;
}

const initialState: State = {
  address: "",
  network: "",
  totalColateral: 200,
  userDebt: 10,
  colBalance: 0,
  colBalanceVal: 0,
  rewardBal: 0,
};

export const bakiSlice = createSlice({
  name: "Baki",
  initialState,
  reducers: {
    updateAddress: (state, action: PayloadAction<string>) => {
      state.address = action.payload;
    },
    updateNetwork: (state, action: PayloadAction<any>) => {
      state.network = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateAddress, updateNetwork } = bakiSlice.actions;

export default bakiSlice.reducer;
