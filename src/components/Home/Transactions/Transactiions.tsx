import React from "react";
import "./Transactions.css";
import { Link } from "react-router-dom";
import ZUSD from "../../../assets/ZUSD.png";
function Transactiions() {
  return (
    <div className="w-9/12 mt-4">
      <div className="flex justify-between">
        <p className="font-bold">Activity</p>
        <Link to="/app/transactions">
          <p className="see-transactions">See transaction history</p>
        </Link>
      </div>
      <div className="transaction-box mt-4">
        <div className="transaction-head">
          <p className="font-bold">Transaction</p>
          <p className="font-bold">Amount</p>

          <p className="font-bold">Status</p>
          <p className="font-bold">Date</p>
        </div>

        <div className="transaction">
          <div className="flex">
            <img src={ZUSD} alt="ZUSD" className="h-7" />
            <p className="ml-2">ZUSD Deposited</p>
          </div>
          <p>$1000</p>
          <p>Pending</p>
          <p>21/03/2022</p>
        </div>
        <div className="transaction">
          <div className="flex">
            <img src={ZUSD} alt="ZUSD" className="h-7" />
            <p className="ml-2">ZUSD Deposited</p>
          </div>
          <p>$1000</p>
          <p>Pending</p>
          <p>21/03/2022</p>
        </div>
        <div className="transaction">
          <div className="flex">
            <img src={ZUSD} alt="ZUSD" className="h-7" />
            <p className="ml-2">ZUSD Deposited</p>
          </div>
          <p>$1000</p>
          <p>Pending</p>
          <p>21/03/2022</p>
        </div>
        <div className="transaction">
          <div className="flex">
            <img src={ZUSD} alt="ZUSD" className="h-7" />
            <p className="ml-2">ZUSD Deposited</p>
          </div>
          <p>$1000</p>
          <p>Pending</p>
          <p>21/03/2022</p>
        </div>
      </div>
    </div>
  );
}

export default Transactiions;
