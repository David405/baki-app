/* eslint-disable @typescript-eslint/no-unused-vars */
import { ethers } from "ethers";
import axios from "axios";
import { useEffect, useState } from "react";
import useConnector from "./useConnector";
import { config } from "../config";
import vault from "../contracts/vault.json";
import { updateTransactions } from "../redux/reducers/bakiReducer";
import { useDispatch, useSelector } from "react-redux";

declare const window: any;
function useSwap() {
  const { provider } = useConnector();
  const { address, fee } = useSelector((state: any) => state.baki);

  const dispatch = useDispatch();
  const [contract, setContract] = useState<any>(null);
  useEffect(() => {
    if (provider) {
      const signer = provider.getSigner();
      setContract(new ethers.Contract(config.vaultAddress, vault, signer));
    }
  }, [provider]);
  const swap = async (
    _amount: number,
    _fromzToken: string,
    _tozToken: string,
    _receiveAmt: number
  ) => {
    let from = _fromzToken === "zCFA" ? "zxaf" : _fromzToken.toLowerCase();
    let to = _tozToken === "zCFA" ? "zxaf" : _tozToken.toLowerCase();

    let hash = "";
    try {
      const tx = await contract.swap(
        ethers.utils.parseUnits(String(_amount), "ether"),
        from,
        to
      );
      await tx.wait();
      let transactions: any = {};
      let _transactions = [];
      let transaction = {
        action: "",
        status: "",
        hash: "",
        date: "",
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
      let date = new Date();
      transaction.date = `${date.getDate()}/${
        date.getMonth() + 1
      }/${date.getFullYear()}`;
      let _toAmt = _receiveAmt - (_receiveAmt * fee) / 100;
      const txns = await window.localStorage.getItem("transactions");
      transaction.swapBody.fromAmount = Number(_amount);
      transaction.swapBody.toAmount = Number(_toAmt);
      transaction.swapBody.fromCurrency = _fromzToken;
      transaction.swapBody.toCurrency = _tozToken;
      transaction.action = "Swap";
      transaction.status = "Successful";
      transaction.hash = tx?.hash;
      hash = tx?.hash;
      if (txns) {
        if (JSON.parse(txns)[address]?.length <= 5) {
          _transactions = JSON.parse(txns)[address];
          _transactions.push(transaction);
        } else {
          _transactions.push(transaction);
        }
      } else {
        _transactions.push(transaction);
      }

      transactions[address] = _transactions.reverse();

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
        date: "",
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
      let date = new Date();
      transaction.date = `${date.getDate()}/${
        date.getMonth() + 1
      }/${date.getFullYear()}`;
      transaction.swapBody.fromAmount = Number(_amount);
      transaction.swapBody.toAmount = Number(_receiveAmt);
      transaction.swapBody.fromCurrency = _fromzToken;
      transaction.swapBody.toCurrency = _tozToken;
      transaction.action = "Swap";
      transaction.status = "Failed";
      transaction.hash = hash;
      const txns = await window.localStorage.getItem("transactions");

      if (txns) {
        if (JSON.parse(txns)[address]?.length <= 5) {
          _transactions = JSON.parse(txns)[address];
          _transactions.push(transaction);
        } else {
          _transactions.push(transaction);
        }
      } else {
        _transactions.push(transaction);
      }
      transactions[address] = _transactions.reverse();

      await window.localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
      );
      console.error(err.error.message);
      return false;
    }
  };

  return { swap };
}

export default useSwap;
