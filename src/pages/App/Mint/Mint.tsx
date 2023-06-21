/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import Borrow from "../../../components/Borrow/Borrow";
import Repay from "../../../components/Repay/Repay";
import MainLayout from "../../../layouts/MainLayout";
import { useSelector } from "react-redux";
import useDeposit from "../../../hooks/useDeposit";
import useData from "../../../hooks/useData";
import Transactiions from "../../../components/Home/Transactions/Transactions";
import loader from "../../../assets/loader/loader.gif";
import { toast } from "react-toastify";
import "./Mint.css";
declare const window: any;

function Mint() {
  const test = useData();

  const [action, setAction] = useState<string>("borrow");
  const [value, setValue] = useState<number>();
  const { claimReward, getUSDValue } = useDeposit();
  const { userColBalance, userDebt, network, rewardBal } = useSelector(
    (state: any) => state.baki
  );
  const [loading, setLoading] = useState<boolean>(false);

  const handleClaimReward = async () => {
    if (rewardBal < 0) return;
    setLoading(true);
    let result = await claimReward();
    setLoading(false);
    if (result) {
      toast.success("Transaction Successful !!");
      window.location.reload();
    } else {
      toast.error("Transaction Failed !!");
    }
  };

  useEffect(() => {
    getUSDValue(userColBalance).then(_value => {
      setValue(_value);
    });
  }, [value, getUSDValue, userColBalance]);

  return (
    <>
      <MainLayout>
        <div className="p-4">
          <p className="overview">OVERVIEW</p>
          <div className="claim-rewards">
            <div className="mt-2">
              <p className="rewards">REWARDS</p>
              <p className="font-bold claim-heading">Claim your Reward!</p>
              <p className="claim-subtitle">
                You have earned
                <span className="ml-2 claim-amount">
                  {(rewardBal * 10 ** -6).toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}
                  <span className="ml-1">zUSD</span>
                </span>
              </p>
            </div>
            <button className="claim-btn mt-5" onClick={handleClaimReward}>
              {loading ? (
                <img
                  src={loader}
                  style={{
                    height: "40px",
                  }}
                  alt="Loader"
                />
              ) : (
                " Claim now"
              )}
              <img className="ml-2" src="/images/up-light.png" alt="" />
            </button>
          </div>
          <div className="user-details">
            <div className="user-detail">
              <div>
                <p className="heading">Position Health</p>
                <div className="flex itams-center">
                  <p
                    className="detail-subt"
                    style={{
                      color: userColBalance / userDebt >= 1.5 ? "green" : "red",
                    }}
                  >
                    {userColBalance / userDebt >= 1.5 ? "Safe" : "Unsafe"}
                  </p>
                  <div
                    className="indicator"
                    style={{
                      backgroundColor:
                        userColBalance / userDebt >= 1.5 ? "green" : "red",
                    }}
                  ></div>
                </div>
              </div>
              <img src="/images/health.png" alt="" />
            </div>
            <div className="user-detail mid-detail">
              <div>
                <p className="heading">Collateral</p>
                <p className="detail-subt">
                  {userColBalance?.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}
                  {network.chainId === 43113 && " USDC"}
                  {network.chainId === 44787 && "cUSD"}
                </p>
              </div>
              <img src="/images/usdc.png" alt="" />
            </div>
            <div className="user-detail mid-detail">
              <div>
                <p className="heading">Value</p>
                <p className="detail-subt">
                  $
                  {value?.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
              <img src="/images/dollar.png" alt="" />
            </div>
            <div className="user-detail">
              <div>
                <p className="heading">Debt</p>
                <p className="detail-subt">
                  {userDebt?.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
              <img src="/images/clock.png" alt="" />
            </div>
          </div>
          <div className="borrow-repay">
            <div className="mint-head">
              <button
                onClick={() => setAction("borrow")}
                style={{
                  color: action === "borrow" ? "#682609" : "#495055",
                  borderBottomColor:
                    action === "borrow" ? "#682609" : "#dbdedf",
                  borderBottomWidth: action === "borrow" ? 2 : 0,
                }}
                className="pb-2"
              >
                Deposit
              </button>
              <button
                style={{
                  color: action === "repay" ? "#682609" : "#495055",
                  borderBottomColor: action === "repay" ? "#682609" : "#dbdedf",
                  borderBottomWidth: action === "repay" ? 2 : 0,
                }}
                onClick={() => setAction("repay")}
                className="ml-5 pb-2"
              >
                Withdraw
              </button>
            </div>
            <div className="p-4">
              <p className="text mb-4">
                Select the asset you would like to deposit.
              </p>
              {action === "borrow" ? <Borrow /> : <Repay />}
            </div>
          </div>

          <Transactiions />
        </div>
      </MainLayout>
    </>
  );
}

export default Mint;
