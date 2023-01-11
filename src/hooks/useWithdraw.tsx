import { ethers } from "ethers";
import { useEffect, useState } from "react";
import useConnector from "./useConnector";
import { config } from "../config";
import vault from "../contracts/vault.json";
import { updateTransactions } from "../redux/reducers/bakiReducer";
import { useDispatch } from "react-redux";
declare const window: any;

function useWithdraw() {
  const { provider } = useConnector();
  const dispatch = useDispatch();

  const [contract, setContract] = useState<any>(null);
  useEffect(() => {
    if (provider) {
      const signer = provider.getSigner();
      setContract(new ethers.Contract(config.vaultAddress, vault, signer));
    }
  }, [provider]);
  const withdraw = async (
    _amountToRepay: number,
    _amountToWithdraw: number,
    _zToken: string,
    _asset: string
  ) => {
    try {
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
          repayCurrency: "",
          repayAmount: 0,
          withdrawAmount: 0,
        },
      };
      const tx = await contract.repayAndWithdraw(
        _amountToRepay,
        _amountToWithdraw,
        _zToken
      );
      await tx.wait();
      const txns = await window.localStorage.getItem("transactions");
      transaction.repayBody.repayAmount = Number(_amountToRepay);
      transaction.repayBody.withdrawAmount = Number(_amountToWithdraw);
      transaction.repayBody.repayCurrency = _asset;
      transaction.action = "Withdraw";
      transaction.status = "Successful";
      transaction.hash = tx?.hash;
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

      transaction.repayBody.repayAmount = Number(_amountToRepay);
      transaction.repayBody.withdrawAmount = Number(_amountToWithdraw);
      transaction.action = "Withdrawal";
      transaction.status = "Failed";
      transaction.hash = "";
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
      console.error(err);
      return false;
    }
  };
  return { withdraw };
}

export default useWithdraw;