import { useState } from "react";
import Borrow from "../../../components/Borrow/Borrow";
import Repay from "../../../components/Repay/Repay";
import MainLayout from "../../../layouts/MainLayout";

import "./Mint.css";
function Mint() {
  const [action, setAction] = useState<string>("borrow");
  return (
    <>
      <MainLayout>
        <div className="p-4">
          <div className="borrow-repay">
            <div className="mint-head">
              <button
                onClick={() => setAction("borrow")}
                style={{
                  color: action === "borrow" ? "#2595FF" : "#495055",
                  borderBottomColor:
                    action === "borrow" ? "#2595FF" : "#dbdedf",
                  borderBottomWidth: action === "borrow" ? 2 : 0,
                }}
              >
                Deposit
              </button>
              <button
                style={{
                  color: action === "repay" ? "#2595FF" : "#495055",
                  borderBottomColor: action === "repay" ? "#2595FF" : "#dbdedf",
                  borderBottomWidth: action === "repay" ? 2 : 0,
                }}
                onClick={() => setAction("repay")}
                className="ml-5"
              >
                Withdraw
              </button>
            </div>
            <div className="p-4">
              {action === "borrow" ? <Borrow /> : <Repay />}
            </div>
          </div>
          <div className="user-details">
            <div className="user-detail">
              <p className="heading">Position Health</p>
              <p
                style={{
                  color: "green",
                }}
              >
                Safe
              </p>
            </div>
            <div className="user-detail mid-detail">
              <p className="heading">Collateral</p>
              <p>0.00 cUSD</p>
            </div>
            <div className="user-detail mid-detail">
              <p className="heading">Value</p>
              <p>$0.00</p>
            </div>
            <div className="user-detail">
              <p className="heading">Debt</p>
              <p>0.00</p>
            </div>
          </div>
          <div className="claim-rewards">
            <div>
              <p className="font-bold claim-heading">Claim your rewards</p>
              <p className="claim-amount">Total: $XXXX</p>
              <button className="claim-btn">Claim now</button>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
}

export default Mint;
