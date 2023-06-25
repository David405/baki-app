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
// import redstone from "redstone-api";
import { config } from "../../config";
import { toast } from "react-toastify";
import millify from "millify";

axios.defaults.baseURL = `https://api.coinlayer.com/api/live?access_key=${config.coinlayerAPIKEY}`;
declare const window: any;

function Borrow() {
  const { deposit } = useDeposit();
  const { zUSDBal, userDebt, collateral, activeCol, userColBalance } =
    useSelector((state: any) => state.baki);
  const [perVal, setPerVal] = useState<number>(0);
  const [onFocus, setOnFocus] = useState<boolean>(false);
  const [depositAmount, setDepositAmount] = useState<any>(0);
  const [mintAmount, setMintAmount] = useState<any>(0);
  const [stage, setStage] = useState<number>(1);
  const [show, setShow] = useState<boolean>(false);
  // const [showAssets, setShowAssets] = useState<boolean>(false);
  // const [asset, setAsset] = useState<string>("");
  // const [colRate, setColRate] = useState<any>(0);
  const [loadingApprove, setLoadingApprove] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { approve } = useToken("USDC", false);
  // const getColRate = async () => {
  //   const price = await redstone.getPrice(activeCol);
  //   setColRate(price.value);
  // };
  useEffect(() => {
    if (depositAmount < 0 || mintAmount < 0) return;

    if (depositAmount || mintAmount) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [depositAmount, mintAmount]);

  // useEffect(() => {
  //   getColRate();
  // }, [depositAmount]);

  const handleApprove = async () => {
    if (depositAmount < 0 || mintAmount < 0) return;
    if (stage === 1) {
      setLoadingApprove(true);
      let result = await approve(depositAmount);
      if (result) {
        toast.success("Transaction Approved !!");
        setStage(2);
        setLoadingApprove(false);
      } else {
        setLoadingApprove(false);
        toast.error("Transaction Failed !!");
      }
    }
  };
  const mint = async () => {
    if (depositAmount < 0 || mintAmount < 0) return;
    if (depositAmount || (mintAmount && stage === 2)) {
      setLoading(true);
      let result = await deposit(depositAmount, mintAmount);
      if (result) {
        setLoading(false);
        setStage(1);
        toast.success("Transaction Successful !!");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        toast.error("Transaction Failed !!");
        setLoading(false);
      }
    }
  };

  const calculateValue = (percentage: number) => {
    if (depositAmount || userColBalance) {
      setPerVal(percentage);
      let debt = userDebt;
      let colRatio = 1.5;
      let val2 = (userColBalance + Number(depositAmount)) / colRatio;
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
        <div className="deposit-body">
          <div className="flex justify-between ">
            <p className="title">DEPOSIT COLLATERAL</p>
            <p
              onClick={() => setDepositAmount(collateral)}
              className="text"
              style={{
                fontSize: 12,
                cursor: "pointer",
              }}
            >
              USDC balance:
              <span className="ml-2">
                {collateral?.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}
              </span>
            </p>
          </div>
          <div className="flex justify-between items-center">
            <button className="choose px-1 py-1">
              <img src="/images/usdc-dark.png" alt="USDC" />
              <span className="mr-2 text-font-grey">USDC</span>
              <img src="/images/car-down.png" alt="cerret" />
            </button>
            <input
              type="number"
              placeholder="Enter Amount"
              value={depositAmount ? depositAmount : ""}
              onChange={e => setDepositAmount(e.target.value)}
            />
          </div>
          <div className="position flex-1">
            <div className="position-details">
              <p>
                Deposit Value: ${" "}
                {millify(Number(depositAmount), {
                  units: ["", "K", "M", "B", "T", "P", "E"],
                })}
              </p>
            </div>
            <div className="position-details">
              <p>Position Health: Safe</p>
            </div>
            <div className="position-details">
              <p>cRatio: {((userColBalance / userDebt) * 100).toFixed(2)} %</p>
            </div>
          </div>
          <button
            style={{
              background: stage === 1 ? "#241f17" : "rgba(36, 31, 23, 0.17)",
            }}
            className="approve"
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
              "Approve"
            )}
          </button>
        </div>

        <div>
          <img src="/images/mint.png" alt="" />
        </div>
        <div className="deposit-body">
          <div className="flex justify-between">
            <p className="title">Mint zUSD</p>
            <p
              onClick={() => setMintAmount(zUSDBal)}
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
          </div>
          <div className="flex justify-between items-center">
            <button className="choose">
              <img src="/images/zusd.png" alt="zUSD" />
              <span className="mr-2 text-font-grey">zUSD</span>
              <img src="/images/car-down.png" alt="cerret" />
            </button>
            <input
              value={mintAmount ? mintAmount : ""}
              type="number"
              placeholder="Enter Amount"
              onChange={e => setMintAmount(e.target.value)}
            />
          </div>
          <div className="quick-btns ">
            <button
              onClick={() => calculateValue(10 / 100)}
              style={{
                borderColor: perVal === 10 / 100 ? "#682609" : "#dbdedf",
                color: perVal === 10 / 100 ? "#682609" : "#5A5A65",
                borderWidth: perVal === 10 / 100 ? 2 : 1,
              }}
            >
              10%
            </button>
            <button
              onClick={() => calculateValue(25 / 100)}
              style={{
                borderColor: perVal === 25 / 100 ? "#682609" : "#dbdedf",
                color: perVal === 25 / 100 ? "#682609" : "#5A5A65",
                borderWidth: perVal === 25 / 100 ? 2 : 1,
              }}
            >
              25%
            </button>
            <button
              onClick={() => calculateValue(50 / 100)}
              style={{
                borderColor: perVal === 50 / 100 ? "#682609" : "#dbdedf",
                color: perVal === 50 / 100 ? "#682609" : "#5A5A65",
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
                borderColor: perVal === 75 / 100 ? "#682609" : "#dbdedf",
                color: perVal === 75 / 100 ? "#682609" : "#5A5A65",
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
                borderColor: onFocus ? "#682609" : "#dbdedf",
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
          <button
            style={{
              background: stage === 2 ? "#241f17" : "rgba(36, 31, 23, 0.17)",
            }}
            className="mint"
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
              "Deposit and Mint"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Borrow;
