/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import Borrow from "../../../components/Borrow/Borrow";
import Repay from "../../../components/Repay/Repay";
import MainLayout from "../../../layouts/MainLayout";
import { useSelector } from "react-redux";
import useDeposit from "../../../hooks/useDeposit";
import useData from "../../../hooks/useData";
import Transactiions from "../../../components/Home/Transactions/Transactiions";
import loader from "../../../assets/loader/loader.gif";
import { toast } from "react-toastify";
import "./Mint.css";
declare const window: any;

function Mint() {
  const [action, setAction] = useState<string>("borrow");
  const { claimReward } = useDeposit();
  let test = useData();
  const { colBalance, userColBalance, userDebt, network, rewardBal } =
    useSelector((state: any) => state.baki);
  const [loading, setLoading] = useState<boolean>(false);

  const handleClaimReward = async () => {
    if (rewardBal < 0) return;
    setLoading(true);
    let result = await claimReward();
    setLoading(false);
    if (result) {
      toast.success("Transaction successful !!");
      window.location.reload();
    } else {
      toast.error("Transaction failed !!");
    }
  };
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
              <p>
                {userColBalance?.toFixed(2)}{" "}
                {network.chainId === 43113 && "USDC"}
                {network.chainId === 44787 && "cUSD"}
              </p>
            </div>
            <div className="user-detail mid-detail">
              <p className="heading">Value</p>
              <p>${userColBalance?.toFixed(2)}</p>
            </div>
            <div className="user-detail">
              <p className="heading">Debt</p>
              <p>{userDebt?.toFixed(2)}</p>
            </div>
          </div>

          <div className="claim-rewards">
            <div>
              <p className="font-bold claim-heading">Claim your rewards</p>
              <p className="claim-amount">
                Total: {rewardBal ? `$${rewardBal.toFixed(2)}` : "$0.00"}
              </p>
              <button className="claim-btn" onClick={handleClaimReward}>
                {loading ? (
                  <img
                    src={loader}
                    style={{
                      height: "40px",
                    }}
                    alt="Loader"
                  />
                ) : (
                  "Claim now"
                )}
              </button>
            </div>
          </div>
        </div>

        <Transactiions />
      </MainLayout>
    </>
  );
}

export default Mint;
