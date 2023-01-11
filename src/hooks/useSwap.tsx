/* eslint-disable @typescript-eslint/no-unused-vars */
import { ethers } from "ethers";
import axios from "axios";
import { useEffect, useState } from "react";
import useConnector from "./useConnector";
import { config } from "../config";
import vault from "../contracts/vault.json";
import { updateTransactions } from "../redux/reducers/bakiReducer";
import { useDispatch } from "react-redux";

declare const window: any;
function useSwap() {
  const { provider } = useConnector();
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
    _tozToken: string
  ) => {
    let from = "";
    let to = "";

    if (_fromzToken === "zUSD") {
      from = config.zUSD;
    } else if (_fromzToken === "zCFA") {
      from = config.zXAF;
    } else if (_fromzToken === "zNGN") {
      from = config.zNGN;
    } else if (_fromzToken === "zZAR") {
      from = config.zZAR;
    }
    if (_tozToken === "zUSD") {
      to = config.zUSD;
    } else if (_tozToken === "zCFA") {
      to = config.zXAF;
    } else if (_tozToken === "zNGN") {
      to = config.zNGN;
    } else if (_tozToken === "zZAR") {
      to = config.zZAR;
    }
    let hash = "";
    try {
      const tx = await contract.swap(Number(_amount), from, to);
      await tx.wait();
      let transactions = [];
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
      transaction.swapBody.fromAmount = Number(_amount);
      transaction.swapBody.toAmount = Number(_amount);
      transaction.swapBody.fromCurrency = _fromzToken;
      transaction.swapBody.toCurrency = _tozToken;
      transaction.action = "Swap";
      transaction.status = "Successful";
      transaction.hash = tx?.hash;
      hash = tx?.hash;
      if (JSON.parse(txns)?.length <= 5) {
        transactions = JSON.parse(txns);
        transactions.push(transaction);
      } else {
        transactions.push(transaction);
      }

      await window.localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
      );
      dispatch(updateTransactions(transactions));
      window.location.reload();
      return true;
    } catch (err: any) {
      let transactions = [];
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

      transaction.swapBody.fromAmount = Number(_amount);
      transaction.swapBody.toAmount = Number(_amount);
      transaction.swapBody.fromCurrency = _fromzToken;
      transaction.swapBody.toCurrency = _tozToken;
      transaction.action = "Swap";
      transaction.status = "Failed";
      transaction.hash = hash;
      const txns = await window.localStorage.getItem("transactions");

      if (JSON.parse(txns)?.length < 5) {
        transactions = JSON.parse(txns);
        transactions.push(transaction);
      } else {
        transactions.push(transaction);
      }

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