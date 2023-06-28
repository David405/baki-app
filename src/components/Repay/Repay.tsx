/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import ZUSD from "../../assets/ZUSD.png";
import ZNGN from "../../assets/ZNGN.png";
import ZCFA from "../../assets/ZXAF.png";
import ZZAR from "../../assets/ZZAR.png";
import USDC from "../../assets/usdc.png";
import loader from "../../assets/loader/loader.gif";
import "./Repay.css";
import useToken from "../../hooks/useToken";
import { config } from "../../config";
import useWithdraw from "../../hooks/useWithdraw";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
declare const window: any;

function Repay() {
  const { zUSDBal, zNGNBal, zCFABal, zZARBal, userColBalance } = useSelector(
    (state: any) => state.baki
  );
  const [zTokenAmount, setZTokenAmount] = useState<any>(0);
  const [colAmount, setColAmount] = useState<any>(0);
  const [stage, setStage] = useState<number>(1);
  const [showZAssets, setShowZAssets] = useState<boolean>(false);
  const [zAsset, setZAsset] = useState<string>("ZUSD");
  const [loadingApprove, setLoadingApprove] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { approve, allowance } = useToken("zUSD", true);

  const { withdraw } = useWithdraw();

  const handleApprove = async () => {
    if (zTokenAmount <= 0) return;
    setLoadingApprove(true);
    let result = await approve(zTokenAmount);
    if (result) {
      setLoadingApprove(false);
      toast.success("Transaction Approved !!");
    } else {
      setLoadingApprove(false);
      toast.error("Transaction Failed !!");
    }
  };
  const repay = async () => {
    if (colAmount <= 0 || colAmount <= 0) return;

    setLoading(true);
    const result = await withdraw(
      Number(zTokenAmount),
      Number(colAmount),
      zAsset,
      zAsset
    );
    if (result) {
      setColAmount(0);
      toast.success("Transaction Successful !!");
      setLoading(false);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else {
      toast.error("Transaction Failed !!");
      setLoading(false);
    }
  };

  const selectZAsset = (_asset: string) => {
    setZAsset(_asset);
    setShowZAssets(false);
  };

  return (
    <div className="repay">
      <div className="top">
        <div className="deposit-body">
          <div className="flex justify-between">
            <p className="text">REPAY ZTOKEN</p>
            {zAsset && (
              <>
                {zAsset === "ZUSD" && (
                  <p
                    onClick={() => setZTokenAmount(zUSDBal)}
                    className="text"
                    style={{
                      fontSize: 12,
                      cursor: "pointer",
                    }}
                  >
                    zUSD balance:
                    <span className="ml-2">
                      {zUSDBal?.toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </p>
                )}
                {zAsset === "ZNGN" && (
                  <p
                    onClick={() => setZTokenAmount(zNGNBal)}
                    style={{
                      fontSize: 12,
                      cursor: "pointer",
                    }}
                  >
                    zNGN balance:
                    <span className="ml-2">
                      {zNGNBal?.toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </p>
                )}
                {zAsset === "ZCFA" && (
                  <p
                    onClick={() => setZTokenAmount(zCFABal)}
                    style={{
                      fontSize: 12,
                      cursor: "pointer",
                    }}
                  >
                    zCFA balance:
                    <span className="ml-2">
                      {zCFABal?.toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </p>
                )}
                {zAsset === "ZZAR" && (
                  <p
                    onClick={() => setZTokenAmount(zZARBal)}
                    style={{
                      fontSize: 12,
                      cursor: "pointer",
                    }}
                  >
                    zZAR balance:
                    <span className="ml-2">
                      {zZARBal?.toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </p>
                )}
              </>
            )}
          </div>
          <div className="flex justify-between items-center">
            <div>
              <button
                className="choose px-2 py-2"
                onClick={() => setShowZAssets(!showZAssets)}
              >
                <span className="flex items-center">
                  {zAsset && (
                    <>
                      {zAsset === "ZUSD" && (
                        <img src={ZUSD} alt="ZUSD" className="h-6" />
                      )}
                      {zAsset === "ZNGN" && (
                        <img src={ZNGN} alt="ZNGN" className="h-6" />
                      )}
                      {zAsset === "ZCFA" && (
                        <img src={ZCFA} alt="ZCFA" className="h-6" />
                      )}
                      {zAsset === "ZZAR" && (
                        <img src={ZZAR} alt="ZZAR" className="h-6" />
                      )}
                    </>
                  )}
                  <p
                    className="ml-2"
                    style={{
                      fontSize: zAsset ? 14 : 10,
                    }}
                  >
                    {zAsset ? zAsset : "Choose Asset"}
                  </p>
                </span>
                {showZAssets ? (
                  <AiOutlineUp size={18} color={"#5A5A65"} />
                ) : (
                  <AiOutlineDown size={18} color={"#5A5A65"} />
                )}
              </button>
              {showZAssets && (
                <div className="mt-1 text-font-grey cursor-pointer absolute rounded  select-assets">
                  <div
                    className="flex p-2 mb-2 select-asset"
                    onClick={() => selectZAsset("ZUSD")}
                  >
                    <img src={ZUSD} alt="zusd" className="h-7" />
                    <p className="ml-2">zUSD</p>
                  </div>
                  <div
                    className="flex p-2 mb-2 select-asset"
                    onClick={() => selectZAsset("ZNGN")}
                  >
                    <img src={ZNGN} alt="" className="h-7" />
                    <p className="ml-2">zNGN</p>
                  </div>
                  <div
                    className="flex p-2 mb-2 select-asset"
                    onClick={() => selectZAsset("ZCFA")}
                  >
                    <img src={ZCFA} alt="" className="h-7" />
                    <p className="ml-2">zCFA</p>
                  </div>
                  <div
                    className="flex p-2 mb-2 select-asset"
                    onClick={() => selectZAsset("ZZAR")}
                  >
                    <img src={ZZAR} alt="" className="h-7" />
                    <p className="ml-2">zZAR</p>
                  </div>
                </div>
              )}
            </div>
            <input
              type="number"
              placeholder="Enter Amount"
              value={zTokenAmount ? zTokenAmount : ""}
              onChange={e => setZTokenAmount(e.target.value)}
              disabled={zAsset ? false : true}
            />
          </div>
          <button
            style={{
              background:
                zTokenAmount > allowance ? "#241f17" : "rgba(36, 31, 23, 0.17)",
            }}
            onClick={handleApprove}
            className="approve"
          >
            {loadingApprove ? (
              <img
                src={loader}
                style={{
                  height: "40px",
                }}
                alt="Loader"
              />
            ) : (
              "Approve Repay"
            )}
          </button>
        </div>
        <div>
          <img src="/images/mint.png" alt="" />
        </div>
        <div className="deposit-body">
          <div className="flex justify-between">
            <p className="text">WITHDRAW COLLATERAL</p>
            <p
              onClick={() => setColAmount(userColBalance)}
              style={{
                fontSize: 12,
                cursor: "pointer",
              }}
              className="text"
            >
              USDC balance:
              <span className="ml-2">
                {userColBalance?.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}
              </span>
            </p>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <button className="choose px-2 py-1">
                <img src={USDC} alt="USDC" width="25" />
                <span className="mr-2 text-font-grey">USDC</span>
              </button>
            </div>
            <input
              value={colAmount ? colAmount : ""}
              type="number"
              placeholder="Enter Amount"
              onChange={e => setColAmount(e.target.value)}
            />
          </div>
          <button
            style={{
              background: colAmount > 0 ? "#241f17" : "rgba(36, 31, 23, 0.17)",
            }}
            onClick={repay}
            className="withdraw"
          >
            {loading ? (
              <img
                src={loader}
                style={{
                  height: "40px",
                }}
                alt="Loader"
              />
            ) : (
              "Withdraw"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Repay;
