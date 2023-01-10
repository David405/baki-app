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
    _zToken: string
  ) => {
    try {
      let transactions = [];
      let transaction = {
        amount: 0,
        currency: "",
        action: "",
        status: "",
        hash: "",
      };
      const tx = await contract.repayAndWithdraw(
        _amountToRepay,
        _amountToWithdraw,
        _zToken
      );
      await tx.wait();
      const txns = await window.localStorage.getItem("transactions");
      transaction.amount = Number(_amountToWithdraw);
      transaction.currency = "USDC";
      transaction.action = "Withdraw";
      transaction.status = "successfull";
      transaction.hash = tx.hash;
      if (JSON.parse(txns).length <= 5) {
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
        amount: 0,
        currency: "",
        action: "",
        status: "",
        hash: "",
      };

      transaction.amount = Number(_amountToWithdraw);
      transaction.currency = "ZUSD";
      transaction.action = "Withdrawal";
      transaction.status = "failed";
      transaction.hash = "";
      const txns = await window.localStorage.getItem("transactions");

      if (JSON.parse(txns).length < 5) {
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
