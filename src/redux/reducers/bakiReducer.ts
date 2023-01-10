import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// axios.defaults.headers.common["apikey"] = config.exchangeRatesAPIKEY;
export interface State {
  address: string;
  network: any;
  userDebt: number;
  colBalance: number;
  userColBalance: number;
  rewardBal: number;
  userNetMint: number;
  globalNetMint: number;
  colRatio: number;
  totalCollateral: number;
  globalDebt: number;
  collateral: number;
  activeCol: string;
  transactions: any;
}

const initialState: State = {
  address: "",
  network: "",
  userDebt: 0,
  colBalance: 0,
  userColBalance: 0,
  rewardBal: 0,
  userNetMint: 0,
  globalNetMint: 0,
  colRatio: 0,
  totalCollateral: 0,
  globalDebt: 0,
  collateral: 0,
  activeCol: "USDC",
  transactions: [],
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
    updateUserNetMint: (state, action: PayloadAction<any>) => {
      state.userNetMint = action.payload;
    },
    updateGlobalNetMint: (state, action: PayloadAction<number>) => {
      state.globalNetMint = action.payload;
    },
    updateTotalCollateral: (state, action: PayloadAction<number>) => {
      state.totalCollateral = action.payload;
    },
    updateUserDebt: (state, action: PayloadAction<number>) => {
      state.userDebt = action.payload;
    },
    updateGlobalDebt: (state, action: PayloadAction<number>) => {
      state.globalDebt = action.payload;
    },
    updateRewardBalance: (state, action: PayloadAction<any>) => {
      state.rewardBal = action.payload;
    },
    updateCollateral: (state, action: PayloadAction<any>) => {
      state.collateral = action.payload;
    },
    updateUserCollateral: (state, action: PayloadAction<any>) => {
      state.userColBalance = action.payload;
    },
    updateTransactions: (state, action: PayloadAction<any>) => {
      state.transactions = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  updateAddress,
  updateNetwork,
  updateGlobalNetMint,
  updateUserNetMint,
  updateTotalCollateral,
  updateUserDebt,
  updateGlobalDebt,
  updateRewardBalance,
  updateCollateral,
  updateUserCollateral,
  updateTransactions,
} = bakiSlice.actions;

export default bakiSlice.reducer;
