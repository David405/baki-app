/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import "./Borrow.css";
import ZUSD from "../../assets/ZUSD.png";
// import CUSD from "../../assets/cUSD.png";
// import AVAX from "../../assets/avax.png";
import USDC from "../../assets/usdc.png";
import loader from "../../assets/loader/loader.gif";
import axios from "axios";
import { useEffect, useState } from "react";
import useDeposit from "../../hooks/useDeposit";
import useToken from "../../hooks/useToken";
import { useSelector } from "react-redux";
import redstone from "redstone-api";
import { config } from "../../config";
import { toast } from "react-toastify";

axios.defaults.baseURL = `https://api.coinlayer.com/api/live?access_key=${config.coinlayerAPIKEY}`;
declare const window: any;

function Borrow() {
  const { deposit } = useDeposit();
  const { totalCollateral, userDebt, collateral, activeCol } = useSelector(
    (state: any) => state.baki
  );
  const [perVal, setPerVal] = useState<number>(0);
  const [onFocus, setOnFocus] = useState<boolean>(false);
  const [depositAmount, setDepositAmount] = useState<any>(0);
  const [mintAmount, setMintAmount] = useState<any>(0);
  const [stage, setStage] = useState<number>(1);
  const [show, setShow] = useState<boolean>(false);
  // const [showAssets, setShowAssets] = useState<boolean>(false);
  // const [asset, setAsset] = useState<string>("");
  const [colRate, setColRate] = useState<any>(0);
  const [loadingApprove, setLoadingApprove] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { approve } = useToken("USDC", false);
  const getColRate = async () => {
    const price = await redstone.getPrice(activeCol);
    setColRate(price.value);
  };
  useEffect(() => {
    if (depositAmount && mintAmount) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [depositAmount, mintAmount]);

  useEffect(() => {
    getColRate();
  }, [depositAmount]);

  const handleApprove = async () => {
    if (stage === 1) {
      setLoadingApprove(true);
      let result = await approve(depositAmount);
      if (result) {
        toast.success("Approved !!");
        setStage(2);
        setLoadingApprove(false);
      } else {
        setLoadingApprove(false);
        toast.error("Approval failed !!");
      }
    }
  };
  const mint = async () => {
    if (depositAmount && mintAmount && stage === 2) {
      setLoading(true);
      let result = await deposit(depositAmount, mintAmount);
      if (result) {
        setLoading(false);
        setStage(1);
        toast.success("Transaction successful !!");
        window.location.reload();
      } else {
        toast.error("Transaction failed !!");
        setLoading(false);
      }
    }
  };

  const calculateValue = (percentage: number) => {
    if (depositAmount) {
      setPerVal(percentage);
      let colBalance: any = totalCollateral * 10 ** -18;
      let debt = userDebt * 10 ** -18;
      let colRatio = 1.5;
      let val2 = (colBalance + Number(depositAmount)) / colRatio;
      let val3 = val2 - debt;
      let maxVal = Math.max(0, val3);
      setMintAmount(maxVal * percentage);
    }
  };

  // const selectAsset = (_asset: string) => {
  //   setAsset(_asset);
  //   setShowAssets(false);
  // };

  return (
    <div className="borrow">
      <div className="top">
        <div className="action-box">
          <div className="deposit-head">
            <p>Choose amount to Deposit</p>
          </div>
          <div className="deposit-body">
            <div className="flex justify-between">
              <p>Deposit Collateral</p>
              <p
                style={{
                  fontSize: 12,
                }}
              >
                Balance: {collateral}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <input
                type="number"
                placeholder="0"
                value={depositAmount}
                onChange={e => setDepositAmount(e.target.value)}
              />
              <div>
                {/* <button
                  className="choose px-2 py-2"
                  onClick={() => setShowAssets(!showAssets)}
                  style={{
                    marginLeft: 70,
                  }}
                >
                  <span className="flex items-center">
                    {asset && (
                      <>
                        {asset === "AVAX" && (
                          <img src={AVAX} alt="zusd" className="h-7" />
                        )}
                        {asset === "cUSD" && (
                          <img src={CUSD} alt="cusd" className="h-7" />
                        )}
                      </>
                    )}
                    <p
                      className="ml-2"
                      style={{
                        fontSize: asset ? 14 : 10,
                      }}
                    >
                      {asset ? asset : "Choose Asset"}
                    </p>
                  </span>
                  {showAssets ? (
                    <AiOutlineUp size={18} color={"#5A5A65"} className="mr-2" />
                  ) : (
                    <AiOutlineDown
                      size={18}
                      color={"#5A5A65"}
                      className="mr-2"
                    />
                  )}
                </button> */}
                <button className="choose px-2 py-1">
                  <img className="h-7" src={USDC} alt="zCFA" />
                  <span className="mr-2 text-font-grey">USDC</span>
                </button>
                {/* {showAssets && (
                  <div
                    className="mt-2 text-font-grey cursor-pointer absolute rounded  select-assets"
                    style={{
                      marginLeft: 70,
                    }}
                  >
                    <div
                      className="flex p-2 mb-2 select-asset"
                      onClick={() => selectAsset("AVAX")}
                    >
                      <img src={AVAX} alt="zusd" className="h-7" />
                      <p className="ml-2">AVAX</p>
                    </div>
                    <div
                      className="flex p-2 mb-2 select-asset"
                      onClick={() => selectAsset("cUSD")}
                    >
                      <img src={CUSD} alt="" className="h-7" />
                      <p className="ml-2">cUSD</p>
                    </div>
                  </div>
                )} */}
              </div>
            </div>
          </div>
        </div>
        <div className="action-box ml-2">
          <div className="deposit-head">
            <p>Choose amount to Mint</p>
          </div>
          <div className="deposit-body">
            <div>
              <p>Mint zUSD</p>
            </div>
            <div className="flex justify-between items-center">
              <button className="choose px-2 py-1">
                <img className="h-7" src={ZUSD} alt="zCFA" />
                <span className="mr-2 text-font-grey">zUSD</span>
              </button>
              <input
                style={{
                  marginLeft: 70,
                }}
                value={mintAmount}
                type="number"
                placeholder="0"
                onChange={e => setMintAmount(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between  items-center mt-6">
        <div className="quick-btns flex-1">
          <button
            onClick={() => calculateValue(10 / 100)}
            style={{
              borderColor: perVal === 10 / 100 ? "#2595FF" : "#dbdedf",
              color: perVal === 10 / 100 ? "#2595FF" : "#5A5A65",
              borderWidth: perVal === 10 / 100 ? 2 : 1,
            }}
          >
            10%
          </button>
          <button
            onClick={() => calculateValue(25 / 100)}
            style={{
              borderColor: perVal === 25 / 100 ? "#2595FF" : "#dbdedf",
              color: perVal === 25 / 100 ? "#2595FF" : "#5A5A65",
              borderWidth: perVal === 25 / 100 ? 2 : 1,
            }}
          >
            25%
          </button>
          <button
            onClick={() => calculateValue(50 / 100)}
            style={{
              borderColor: perVal === 50 / 100 ? "#2595FF" : "#dbdedf",
              color: perVal === 50 / 100 ? "#2595FF" : "#5A5A65",
              borderWidth: perVal === 50 / 100 ? 2 : 1,
            }}
          >
            50%
          </button>
          <button
            onClick={() => {
              calculateValue(75 / 100);
              setOnFocus(false);
            }}
            style={{
              borderColor: perVal === 75 / 100 ? "#2595FF" : "#dbdedf",
              color: perVal === 75 / 100 ? "#2595FF" : "#5A5A65",
              borderWidth: perVal === 75 / 100 ? 2 : 1,
            }}
          >
            75%
          </button>
          <div
            className="custom"
            onClick={() => {
              calculateValue(0);
              setOnFocus(true);
            }}
            style={{
              borderColor: onFocus ? "#2595FF" : "#dbdedf",
              borderWidth: onFocus ? 2 : 1,
            }}
          >
            <input
              type="number"
              placeholder="Custom"
              onChange={e => calculateValue(Number(e.target.value) / 100)}
            />
          </div>
        </div>
        <div className="position flex-1">
          <div className="flex flex-col justify-center items-center">
            <p className="heading">Deposit Value</p>
            <p className="font-bold ">${Number(depositAmount).toFixed(2)}</p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <p className="heading">Safe Position</p>
            <div className="indicator"></div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <p className="heading">cRatio</p>
            <p>1.50 %</p>
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
                "Approve Collateral"
              )}
            </button>
            <button
              style={{
                backgroundColor: stage === 2 ? "#f97f41" : "#ccc",
              }}
              onClick={mint}
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
                "Deposit & Mint"
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

export default Borrow;
