/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import "./Transactions.css";
// import { Link } from "react-router-dom";
import ZUSD from "../../../assets/ZUSD.png";
import ZNGN from "../../../assets/ZNGN.png";
import ZCFA from "../../../assets/ZXAF.png";
import ZZAR from "../../../assets/ZZAR.png";
import USDC from "../../../assets/usdc.png";

import { useSelector } from "react-redux";
function Transactiions() {
  const { transactions } = useSelector((state: any) => state.baki);
  return (
    <div className="w-9/12 mt-4">
      <div className="flex justify-between">
        <p className="font-bold">Activity</p>
        {/* <Link to="/app/transactions">
          <p className="see-transactions">See transaction history</p>
        </Link> */}
      </div>
      <div className="transaction-box mt-4">
        {transactions.map((transaction: any, index: number) => (
          <div className="transaction" key={index}>
            <p>
              <span
                style={{
                  marginRight: 5,
                }}
              >
                {" "}
                {transaction.amount}
              </span>
              {transaction.currency}
            </p>
            <div className="flex">
              <p className="ml-2">{transaction.action}</p>
            </div>
            <p
              style={{
                color: transactions.status === "successfull" ? "red" : "green",
              }}
            >
              {transaction.status}
            </p>

            <a
              href={`https://testnet.snowtrace.io/tx/${transaction.hash}`}
              target="_blank"
            >
              View on explorer
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Transactiions;
