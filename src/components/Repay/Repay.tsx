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
  const [show, setShow] = useState<boolean>(false);
  const [showZAssets, setShowZAssets] = useState<boolean>(false);
  const [showColAssets, setShowColAssets] = useState<boolean>(false);
  const [zAsset, setZAsset] = useState<string>("");
  const [colAsset, setColAsset] = useState<string>("");
  const [loadingApprove, setLoadingApprove] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const { approve } = useToken("USDC", false);
  const { withdraw } = useWithdraw();

  const handleApprove = async () => {
    if (stage === 1) {
      setLoadingApprove(true);
      let result = await approve(zTokenAmount);
      if (result) {
        setStage(2);
        setLoadingApprove(false);
        toast.success("Transaction Approved !!");
      } else {
        setLoadingApprove(false);
        toast.error("Transaction Failed !!");
      }
    }
  };
  const repay = async () => {
    if (stage === 2) {
      let zToken = "";
      if (zAsset === "ZUSD") {
        zToken = config.zUSD;
      } else if (zAsset === "ZNGN") {
        zToken = config.zNGN;
      } else if (zAsset === "ZCFA") {
        zToken = config.zCFA;
      } else if (zAsset === "ZZAR") {
        zToken = config.zZAR;
      }
      setLoading(true);
      const result = await withdraw(
        Number(zTokenAmount),
        Number(colAmount),
        zToken,
        zAsset
      );
      if (result) {
        setZTokenAmount(0);
        setColAmount(0);
        toast.success("Transaction Successful !!");
        setStage(1);
        setLoading(false);
        window.location.reload();
      } else {
        toast.error("Transaction Failed !!");
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (zTokenAmount < 0) return;
    if (zTokenAmount) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [zTokenAmount]);

  const selectZAsset = (_asset: string) => {
    setZAsset(_asset);
    setShowZAssets(false);
  };
  // const selectColAsset = (_asset: string) => {
  //   setColAsset(_asset);
  //   setShowColAssets(false);
  // };
  return (
    <div className="repay">
      <div className="top">
        <div className="action-box">
          <div className="deposit-head">
            <p>Choose amount to Repay</p>
          </div>
          <div className="deposit-body">
            <div className="flex justify-between">
              <p>Repay zToken</p>
              {zAsset && (
                <p
                  style={{
                    fontSize: 12,
                    cursor: "pointer",
                  }}
                >
                  Balance:
                  <span className="ml-2">
                    {zAsset === "ZUSD" &&
                      zUSDBal?.toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })}
                    {zAsset === "ZNGN" &&
                      zNGNBal?.toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })}
                    {zAsset === "ZCFA" &&
                      zCFABal?.toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })}
                    {zAsset === "ZZAR" &&
                      zZARBal?.toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })}
                  </span>
                </p>
              )}
            </div>
            <div className="flex justify-between items-center">
              <input
                type="number"
                placeholder="0"
                value={zTokenAmount}
                onChange={e => setZTokenAmount(e.target.value)}
                disabled={zAsset ? false : true}
              />
              <div>
                <button
                  className="choose px-2 py-2"
                  onClick={() => setShowZAssets(!showZAssets)}
                  style={{
                    marginLeft: 70,
                  }}
                >
                  <span className="flex items-center">
                    {zAsset && (
                      <>
                        {zAsset === "ZUSD" && (
                          <img src={ZUSD} alt="ZUSD" className="h-7" />
                        )}
                        {zAsset === "ZNGN" && (
                          <img src={ZNGN} alt="ZNGN" className="h-7" />
                        )}
                        {zAsset === "ZCFA" && (
                          <img src={ZCFA} alt="ZCFA" className="h-7" />
                        )}
                        {zAsset === "ZZAR" && (
                          <img src={ZZAR} alt="ZZAR" className="h-7" />
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
                    <AiOutlineUp size={18} color={"#5A5A65"} className="mr-2" />
                  ) : (
                    <AiOutlineDown
                      size={18}
                      color={"#5A5A65"}
                      className="mr-2"
                    />
                  )}
                </button>
                {showZAssets && (
                  <div
                    className="mt-2 text-font-grey cursor-pointer absolute rounded  select-assets"
                    style={{
                      marginLeft: 70,
                    }}
                  >
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
            </div>
          </div>
        </div>
        <div className="action-box ml-2">
          <div className="deposit-head">
            <p>Choose amount to withdraw</p>
          </div>
          <div className="deposit-body">
            <div className="flex justify-between">
              <p>Withdraw Collateral</p>
              <p
                onClick={() => setColAmount(userColBalance)}
                style={{
                  fontSize: 12,
                  cursor: "pointer",
                }}
              >
                Balance:
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
                  <img className="h-7" src={USDC} alt="zCFA" />
                  <span className="mr-2 text-font-grey">USDC</span>
                </button>
                {/* <button
                  className="choose px-2 py-2"
                  onClick={() => setShowColAssets(!showColAssets)}
                >
                  <span className="flex items-center">
                    {colAsset && (
                      <>
                        {colAsset === "AVAX" && (
                          <img src={AVAX} alt="AVAX" className="h-7" />
                        )}
                        {colAsset === "cUSD" && (
                          <img src={CUSD} alt="cUSD" className="h-7" />
                        )}
                      </>
                    )}
                    <p
                      className="ml-2"
                      style={{
                        fontSize: colAsset ? 14 : 10,
                      }}
                    >
                      {colAsset ? colAsset : "Choose Asset"}
                    </p>
                  </span>
                  {showColAssets ? (
                    <AiOutlineUp size={18} color={"#5A5A65"} className="mr-2" />
                  ) : (
                    <AiOutlineDown
                      size={18}
                      color={"#5A5A65"}
                      className="mr-2"
                    />
                  )}
                </button>
                {showColAssets && (
                  <div
                    className="mt-2 text-font-grey cursor-pointer absolute rounded  select-assets"
                    style={{
                      marginLeft: 0,
                    }}
                  >
                    <div
                      className="flex p-2 mb-2 select-asset"
                      onClick={() => selectColAsset("AVAX")}
                    >
                      <img src={AVAX} alt="zusd" className="h-7" />
                      <p className="ml-2">AVAX</p>
                    </div>
                    <div
                      className="flex p-2 mb-2 select-asset"
                      onClick={() => selectColAsset("cUSD")}
                    >
                      <img src={CUSD} alt="" className="h-7" />
                      <p className="ml-2">cUSD</p>
                    </div>
                  </div>
                )} */}
              </div>
              <input
                style={{
                  marginLeft: 70,
                }}
                value={colAmount}
                type="number"
                placeholder="0"
                onChange={e => setColAmount(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {show && (
        <>
          <div className="action-btns">
            <button
              style={{
                backgroundColor: stage === 1 ? "#f97f41" : "#ccc",
              }}
              onClick={handleApprove}
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
                "   Approve"
              )}
            </button>
            <button
              style={{
                backgroundColor: stage === 2 ? "#f97f41" : "#ccc",
              }}
              onClick={repay}
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
                "Repay"
              )}
            </button>
          </div>
          <div className="action-indicators">
            <div
              className="circle"
              style={{
                backgroundColor: "#f97f41",
              }}
            >
              1
            </div>
            <div
              className="line"
              style={{
                backgroundColor: stage === 2 ? "#f97f41" : "#ccc",
              }}
            ></div>
            <div
              className="circle"
              style={{
                backgroundColor: stage === 2 ? "#f97f41" : "#ccc",
              }}
            >
              2
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Repay;
