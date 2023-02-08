/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import useConnector from "./useConnector";
import { config } from "../config";
import vault from "../contracts/vault.json";
import { useDispatch, useSelector } from "react-redux";
import {
  updateCollateral,
  updateUserCollateral,
  updateTransactions,
} from "../redux/reducers/bakiReducer";
declare const window: any;
const useDeposit = () => {
  const { provider } = useConnector();
  const dispatch = useDispatch();
  const { address, rewardBal } = useSelector((state: any) => state.baki);
  const [contract, setContract] = useState<any>(null);

  useEffect(() => {
    if (provider) {
      const signer = provider.getSigner();
      setContract(new ethers.Contract(config.vaultAddress, vault, signer));
    }
  }, [provider]);

  useEffect(() => {
    getValues();
  }, [contract]);

  const getValues = async () => {
    // Get Coll balance
    let ball = await contract?.getBalance(config.USDC);
    dispatch(updateCollateral(Number(ball?._hex) / 10 ** 18));
    let colBall = await contract?.getUserCollateralBalance();
    dispatch(updateUserCollateral(Number(colBall?._hex) / 10 ** 18));
  };
  const deposit = async (depositAmount: number, mintAmount: number) => {
    let hash = "";
    try {
      let transactions: any = {};
      let _transactions = [];
      let transaction = {
        action: "",
        status: "",
        hash: "",
        depositBody: {
          mintAmount: 0,
          colAmount: 0,
        },
        swapBody: {
          fromCurrency: "",
          fromAmount: 0,
          toCurrency: "",
          toAmount: 0,
        },
        rewardBody: {
          amount: 0,
        },
        repayBody: {
          repayAmount: 0,
          withdrawAmount: 0,
        },
      };

      const tx = await contract?.depositAndMint(
        Number(depositAmount),
        Math.round(mintAmount)
      );
      await tx.wait();
      const txns = await window.localStorage.getItem("transactions");
      transaction.depositBody.colAmount = depositAmount * 100;
      transaction.depositBody.mintAmount = mintAmount * 100;
      transaction.action = "Deposit";
      transaction.status = "Successful";
      transaction.hash = tx.hash;
      hash = tx.hash;
      if (JSON.parse(txns)[address]?.length < 5) {
        _transactions = JSON.parse(txns)[address];
        _transactions.push(transaction);
      } else {
        _transactions.push(transaction);
      }

      transactions[address] = _transactions;

      await window.localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
      );
      dispatch(updateTransactions(transactions));
      console.log("Done");

      return true;
    } catch (err: any) {
      let transactions: any = {};
      let _transactions = [];
      let transaction = {
        action: "",
        status: "",
        hash: "",
        depositBody: {
          mintAmount: 0,
          colAmount: 0,
        },
        swapBody: {
          fromCurrency: "",
          fromAmount: 0,
          toCurrency: "",
          toAmount: 0,
        },
        rewardBody: {
          amount: 0,
        },
        repayBody: {
          repayAmount: 0,
          withdrawAmount: 0,
        },
      };

      transaction.depositBody.colAmount = depositAmount;
      transaction.depositBody.mintAmount = mintAmount;
      transaction.action = "Deposit";
      transaction.status = "Failed";
      transaction.hash = hash;
      const txns = await window.localStorage.getItem("transactions");

      if (JSON.parse(txns)[address]?.length < 5) {
        _transactions = JSON.parse(txns)[address];
        _transactions.push(transaction);
      } else {
        _transactions.push(transaction);
      }

      transactions[address] = _transactions;

      await window.localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
      );
      console.error(err.error);
      return false;
    }
  };

  const claimReward = async () => {
    let hash = "";
    try {
      let transactions: any = {};
      let _transactions = [];
      let transaction = {
        action: "",
        status: "",
        hash: "",
        depositBody: {
          mintAmount: 0,
          colAmount: 0,
        },
        swapBody: {
          fromCurrency: "",
          fromAmount: 0,
          toCurrency: "",
          toAmount: 0,
        },
        rewardBody: {
          amount: 0,
        },
        repayBody: {
          repayAmount: 0,
          withdrawAmount: 0,
        },
      };
      const tx = await contract?.claimFees();
      await tx.wait();
      const txns = await window.localStorage.getItem("transactions");
      transaction.rewardBody.amount = rewardBal * 10 ** -6;
      transaction.action = "Reward";
      transaction.status = "Successful";
      transaction.hash = tx?.hash;
      hash = tx?.hash;
      if (JSON.parse(txns)[address]?.length <= 5) {
        _transactions = JSON.parse(txns)[address];
        _transactions.push(transaction);
      } else {
        _transactions.push(transaction);
      }

      transactions[address] = _transactions;

      await window.localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
      );
      dispatch(updateTransactions(transactions));

      return true;
    } catch (err: any) {
      let transactions: any = {};
      let _transactions = [];
      let transaction = {
        action: "",
        status: "",
        hash: "",
        depositBody: {
          mintAmount: 0,
          colAmount: 0,
        },
        swapBody: {
          fromCurrency: "",
          fromAmount: 0,
          toCurrency: "",
          toAmount: 0,
        },
        rewardBody: {
          amount: 0,
        },
        repayBody: {
          repayAmount: 0,
          withdrawAmount: 0,
        },
      };

      const txns = await window.localStorage.getItem("transactions");

      transaction.rewardBody.amount = rewardBal;
      transaction.action = "Reward";
      transaction.status = "Failed";
      transaction.hash = hash;
      if (JSON.parse(txns)[address]?.length <= 5) {
        _transactions = JSON.parse(txns)[address];
        _transactions.push(transaction);
      } else {
        _transactions.push(transaction);
      }

      transactions[address] = transactions;

      await window.localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
      );
      dispatch(updateTransactions(transactions));
      console.error(err.error);
      return false;
    }
  };

  const getUSDValue = async (_amount: number) => {
    try {
      const result = await contract?.getUSDValueOfCollateral(_amount);
      console.log({ result, _amount });

      return result;
    } catch (error) {
      console.error(error);
    }
  };

  return { deposit, claimReward, getUSDValue };
};

export default useDeposit;
