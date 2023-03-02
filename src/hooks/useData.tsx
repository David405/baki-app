/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useConnector from "./useConnector";
import { ethers } from "ethers";
import {
  updateGlobalNetMint,
  updateUserNetMint,
  updateTotalCollateral,
  updateUserDebt,
  updateGlobalDebt,
  updateRewardBalance,
  updateTransactions,
  updateBalances,
  updateTotalVolume,
  updateLiquidations,
} from "../redux/reducers/bakiReducer";
import { config } from "../config";
import vault from "../contracts/vault.json";
import axios from "axios";
declare const window: any;
function useData() {
  const dispatch = useDispatch();
  const { address, globalNetMint, userNetMint } = useSelector(
    (state: any) => state.baki
  );
  const { provider } = useConnector();
  const [contract, setContract] = useState<any>(null);

  useEffect(() => {
    if (provider) {
      const signer = provider.getSigner();
      setContract(new ethers.Contract(config.vaultAddress, vault, signer));
    }
  }, [provider]);

  useEffect(() => {
    getGlobalDebt();
    getTransactions();
    getzTokenBal();
    getPosition();
  }, [address]);

  useEffect(() => {
    getUserDebt();
    getRewardBalance();
    getTransactions();
    getzTokenBal();
  }, [userNetMint, globalNetMint, address]);

  const getRates = async (base: string, target: string) => {
    try {
      const result = await axios.get(
        `https://api.apilayer.com/exchangerates_data/latest?symbols=${target}&base=${base}`
      );
      return result.data.rates;
    } catch (error) {
      console.error(error);
    }
  };

  const getPosition = async () => {
    // get user net mint
    const userNetMint = await contract?.getNetUserMintValue(address);
    dispatch(updateUserNetMint(Number(userNetMint?._hex)));

    // get global net mint
    const globalNetMint = await contract?.getNetGlobalMintValue();
    dispatch(updateGlobalNetMint(Number(globalNetMint?._hex)));

    // // get total collateral
    // const totalCollateral: any = await contract?.getUserCollateralBalance();
    // dispatch(updateTotalCollateral(Number(totalCollateral?._hex)));

    // get totalVolume
    const totalVolume: any = await contract?.totalSwapVolume();
    dispatch(updateTotalVolume(Number(totalVolume?._hex)));

    // get global Collateral
    const globalCol: any = await contract?.totalCollateral();
    dispatch(updateTotalCollateral(Number(globalCol?._hex)));
  };

  const getzTokenBal = async () => {
    let zUSD = await contract?.getBalance(config.zUSD);
    let zNGN = await contract?.getBalance(config.zNGN);
    let zCFA = await contract?.getBalance(config.zCFA);
    let zZAR = await contract?.getBalance(config.zZAR);
    let ballances = {
      zUSD: Number(zUSD?._hex) / 10 ** 18,
      zNGN: Number(zNGN?._hex) / 10 ** 18,
      zCFA: Number(zCFA?._hex) / 10 ** 18,
      zZAR: Number(zZAR?._hex) / 10 ** 18,
    };
    dispatch(updateBalances(ballances));
  };

  const getUserDebt = async () => {
    // get user debt
    if (userNetMint && globalNetMint) {
      try {
        const userDebt = await contract?._updateUserDebtOutstanding(
          BigInt(userNetMint),
          BigInt(globalNetMint)
        );

        dispatch(updateUserDebt(Number(userDebt?._hex) / 10 ** 18));
      } catch (error) {
        console.error(error);
      }
    }
  };
  const getGlobalDebt = async () => {
    // get global debt
    let totalzUSD = await contract?.getTotalSupply(config.zUSD);
    let totalzNGN = await contract?.getTotalSupply(config.zNGN);
    let totalzXAF = await contract?.getTotalSupply(config.zCFA);
    let totalzZAR = await contract?.getTotalSupply(config.zZAR);

    let NGNUSDRate = await getRates("USD", "NGN");
    let XAFUSDRate = await getRates("USD", "XAF");
    let ZARUSDRate = await getRates("USD", "ZAR");

    totalzUSD = Number(totalzUSD?._hex) / 10 ** 18;
    totalzNGN = Number(totalzNGN?._hex) / 10 ** 18;
    totalzZAR = Number(totalzZAR?._hex) / 10 ** 18;
    totalzXAF = Number(totalzXAF?._hex) / 10 ** 18;

    let globalDebt =
      totalzUSD +
      totalzNGN / NGNUSDRate?.NGN +
      totalzZAR / ZARUSDRate?.ZAR +
      totalzXAF / XAFUSDRate?.XAF;

    dispatch(updateGlobalDebt(globalDebt));
  };

  const getTransactions = async () => {
    let fee = await contract?.swapFee();
    console.log({ fee: Number(fee) });

    let transactions = await window.localStorage.getItem("transactions");
    if (transactions) {
      dispatch(updateTransactions(JSON.parse(transactions)));
    } else {
      dispatch(updateTransactions([]));
    }
  };

  const getRewardBalance = async () => {
    try {
      const balance = await contract?.userAccruedFeeBalance(address);

      dispatch(updateRewardBalance(Number(balance?._hex) * 10 ** -12));
    } catch (error) {
      console.error(error);
    }
  };

  return true;
}

export default useData;
