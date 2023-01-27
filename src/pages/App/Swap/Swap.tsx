/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import MainLayout from "../../../layouts/MainLayout";
import swapArrow from "../../../assets/swap-arr.png";
import ZUSD from "../../../assets/ZUSD.png";
import ZNGN from "../../../assets/ZNGN.png";
import ZCFA from "../../../assets/ZXAF.png";
import ZZAR from "../../../assets/ZZAR.png";
import loader from "../../../assets/loader/loader.gif";

import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import "./Swap.css";
import useToken from "../../../hooks/useToken";
import useSwap from "../../../hooks/useSwap";
import axios from "axios";
import { config } from "../../../config";
import Transactions from "../../../components/Home/Transactions/Transactions";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import useData from "../../../hooks/useData";

axios.defaults.headers.common["apikey"] = config.exchangeRatesAPIKEY;
function Swap() {
  const [fromAmount, setFromAmount] = useState<any>(0);
  const [toAmount, setToAmount] = useState<any>(0);
  const [stage, setStage] = useState<number>(1);
  const [show, setShow] = useState<boolean>(false);
  const [showFromZAssets, setShowFromZAssets] = useState<boolean>(false);
  const [showToZAssets, setShowToZAssets] = useState<boolean>(false);
  const [fromZAsset, setFromZAsset] = useState<string>("zUSD");
  const [toZAsset, setToZAsset] = useState<string>("zNGN");
  const [loadingApprove, setLoadingApprove] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [rate, setRate] = useState<number>(0);
  const [swapOutput, setSwapOutput] = useState<number>(0);
  const { approve } = useToken(fromZAsset, true);
  const { swap } = useSwap();
  let test = useData();

  const { zUSDBal, zNGNBal, zCFABal, zZARBal } = useSelector(
    (state: any) => state.baki
  );

  const getRates = async (base: string, target: string) => {
    try {
      const result = await axios.get(
        `https://api.apilayer.com/exchangerates_data/latest?symbols=${target}&base=${base}`
      );
      return result.data.rates;
    } catch (error) {
      console.error(error);
    }
  };

  const handleApprove = async () => {
    if (fromZAsset === toZAsset) return;
    if (stage === 1) {
      setLoadingApprove(true);
      let result = await approve(fromAmount);
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
  const handleSwap = async () => {
    if (fromZAsset === toZAsset) return;
    if (fromAmount && toAmount && stage === 2) {
      setLoading(true);
      let receivedAmt = toAmount - fromAmount * 0.992;
      try {
        await swap(fromAmount, fromZAsset, toZAsset, receivedAmt);
        setLoading(false);
        setStage(1);
        toast.success("Transaction Successful !!");
      } catch (error) {
        console.error(error);
        toast.error("Transaction Failed !!");
        setLoading(false);
      }
    }
  };

  const handleFields = (_value: string, _field: string) => {
    if (_field === "To") {
      setToAmount(_value);
      setFromAmount(Number(_value) / rate);
    } else if (_field === "From") {
      setFromAmount(_value);
      setToAmount(Number(_value) * rate);
    }
  };
  useEffect(() => {
    if (fromAmount < 0) return;
    if (fromAmount && toAmount) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [fromAmount, toAmount]);

  useEffect(() => {
    if (fromAmount) {
      setLoading(true);
      setLoadingApprove(true);
      getRates(
        fromZAsset.substring(1),
        toZAsset.substring(1) === "CFA" ? "XAF" : toZAsset.substring(1)
      )
        .then((result: any) => {
          if (toZAsset.substring(1) === "NGN") {
            setRate(result.NGN);
            const output = result.NGN * fromAmount;
            setSwapOutput(output);
          }
          if (toZAsset.substring(1) === "ZAR") {
            setRate(result.ZAR);
            const output = result.ZAR * fromAmount;
            setSwapOutput(output);
          }
          if (toZAsset.substring(1) === "CFA") {
            setRate(result.XAF);
            const output = result.XAF * fromAmount;
            setSwapOutput(output);
          }
          if (toZAsset.substring(1) === "USD") {
            setRate(result.USD);
            const output = result.USD * fromAmount;
            setSwapOutput(output);
          }
          setLoading(false);
          setLoadingApprove(false);
        })
        .catch(() => {
          setLoading(false);
          setLoadingApprove(false);
        });
    } else {
      getRates(
        fromZAsset.substring(1),
        toZAsset.substring(1) === "CFA" ? "XAF" : toZAsset.substring(1)
      ).then(res => {
        let currency =
          toZAsset.substring(1) === "CFA" ? "XAF" : toZAsset.substring(1);
        setRate(res[currency]);
      });
    }
  }, [fromAmount, toZAsset, fromZAsset]);

  const selectFromZAsset = (_asset: string) => {
    setFromZAsset(_asset);
    setShowFromZAssets(false);
  };
  const selectToZAsset = (_asset: string) => {
    setToZAsset(_asset);
    setShowToZAssets(false);
  };
  return (
    <>
      <MainLayout>
        <div className="p-4">
          <div className="swap">
            <div className="swap-top">
              <div className="asset-box">
                <div className="flex justify-between items-center">
                  <button
                    className="swap-assets rounded-full"
                    onClick={() => setShowFromZAssets(!showFromZAssets)}
                  >
                    <span className="flex items-center">
                      {fromZAsset && (
                        <>
                          {fromZAsset === "zUSD" && (
                            <img src={ZUSD} alt="ZUSD" className="h-7" />
                          )}
                          {fromZAsset === "zNGN" && (
                            <img src={ZNGN} alt="ZNGN" className="h-7" />
                          )}
                          {fromZAsset === "zCFA" && (
                            <img src={ZCFA} alt="ZCFA" className="h-7" />
                          )}
                          {fromZAsset === "zZAR" && (
                            <img src={ZZAR} alt="ZZAR" className="h-7" />
                          )}
                        </>
                      )}
                      <p
                        className="ml-2"
                        style={{
                          fontSize: fromZAsset ? 14 : 12,
                        }}
                      >
                        {fromZAsset ? fromZAsset : "Choose Asset"}
                      </p>
                    </span>
                    {showFromZAssets ? (
                      <AiOutlineUp
                        size={18}
                        color={"#5A5A65"}
                        className="mr-2"
                      />
                    ) : (
                      <AiOutlineDown
                        size={18}
                        color={"#5A5A65"}
                        className="mr-2"
                      />
                    )}
                  </button>
                  {fromZAsset === "zUSD" && (
                    <p
                      onClick={() => setFromAmount(zUSDBal)}
                      style={{
                        fontSize: 12,
                        cursor: "pointer",
                      }}
                    >
                      Balance:
                      <span className="ml-2">
                        {zUSDBal?.toLocaleString(undefined, {
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    </p>
                  )}
                  {fromZAsset === "zNGN" && (
                    <p
                      onClick={() => setFromAmount(zNGNBal)}
                      style={{
                        fontSize: 12,
                        cursor: "pointer",
                      }}
                    >
                      Balance:
                      <span className="ml-2">
                        {zNGNBal?.toLocaleString(undefined, {
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    </p>
                  )}
                  {fromZAsset === "zCFA" && (
                    <p
                      onClick={() => setFromAmount(zCFABal)}
                      style={{
                        fontSize: 12,
                        cursor: "pointer",
                      }}
                    >
                      Balance:
                      <span className="ml-2">
                        {zCFABal?.toLocaleString(undefined, {
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    </p>
                  )}
                  {fromZAsset === "zZAR" && (
                    <p
                      onClick={() => setFromAmount(zZARBal)}
                      style={{
                        fontSize: 12,
                        cursor: "pointer",
                      }}
                    >
                      Balance:
                      <span className="ml-2">
                        {zZARBal?.toLocaleString(undefined, {
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    </p>
                  )}
                </div>
                {showFromZAssets && (
                  <div
                    className="mt-2 text-font-grey cursor-pointer absolute rounded  select-assets"
                    style={{
                      marginLeft: 0,
                    }}
                  >
                    <div
                      className="flex p-2 mb-2 select-asset"
                      onClick={() => selectFromZAsset("zUSD")}
                    >
                      <img src={ZUSD} alt="zusd" className="h-7" />
                      <p className="ml-2">zUSD</p>
                    </div>
                    <div
                      className="flex p-2 mb-2 select-asset"
                      onClick={() => selectFromZAsset("zNGN")}
                    >
                      <img src={ZNGN} alt="" className="h-7" />
                      <p className="ml-2">zNGN</p>
                    </div>
                    <div
                      className="flex p-2 mb-2 select-asset"
                      onClick={() => selectFromZAsset("zCFA")}
                    >
                      <img src={ZCFA} alt="" className="h-7" />
                      <p className="ml-2">zCFA</p>
                    </div>
                    <div
                      className="flex p-2 mb-2 select-asset"
                      onClick={() => selectFromZAsset("zZAR")}
                    >
                      <img src={ZZAR} alt="" className="h-7" />
                      <p className="ml-2">zZAR</p>
                    </div>
                  </div>
                )}
                <input
                  type="number"
                  placeholder="0"
                  value={fromAmount}
                  onChange={e => handleFields(e.target.value, "From")}
                  disabled={fromZAsset && toZAsset ? false : true}
                />
              </div>
              <div className="swap-icon">
                <img src={swapArrow} alt="" />
              </div>
              <div className="asset-box">
                <div className="flex justify-between items-center">
                  <button
                    className="swap-assets rounded-full"
                    onClick={() => setShowToZAssets(!showToZAssets)}
                  >
                    <span className="flex items-center">
                      {toZAsset && (
                        <>
                          {toZAsset === "zUSD" && (
                            <img src={ZUSD} alt="ZUSD" className="h-7" />
                          )}
                          {toZAsset === "zNGN" && (
                            <img src={ZNGN} alt="ZNGN" className="h-7" />
                          )}
                          {toZAsset === "zCFA" && (
                            <img src={ZCFA} alt="ZCFA" className="h-7" />
                          )}
                          {toZAsset === "zZAR" && (
                            <img src={ZZAR} alt="ZZAR" className="h-7" />
                          )}
                        </>
                      )}
                      <p
                        className="ml-2"
                        style={{
                          fontSize: toZAsset ? 14 : 12,
                        }}
                      >
                        {toZAsset ? toZAsset : "Choose Asset"}
                      </p>
                    </span>
                    {showToZAssets ? (
                      <AiOutlineUp
                        size={18}
                        color={"#5A5A65"}
                        className="mr-2"
                      />
                    ) : (
                      <AiOutlineDown
                        size={18}
                        color={"#5A5A65"}
                        className="mr-2"
                      />
                    )}
                  </button>
                  {toZAsset === "zUSD" && (
                    <p
                      onClick={() => setToAmount(zUSDBal)}
                      style={{
                        fontSize: 12,
                        cursor: "pointer",
                      }}
                    >
                      Balance:
                      <span className="ml-2">
                        {zUSDBal?.toLocaleString(undefined, {
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    </p>
                  )}
                  {toZAsset === "zNGN" && (
                    <p
                      onClick={() => setToAmount(zNGNBal)}
                      style={{
                        fontSize: 12,
                        cursor: "pointer",
                      }}
                    >
                      Balance:
                      <span className="ml-2">
                        {zNGNBal?.toLocaleString(undefined, {
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    </p>
                  )}
                  {toZAsset === "zCFA" && (
                    <p
                      onClick={() => setToAmount(zCFABal)}
                      style={{
                        fontSize: 12,
                        cursor: "pointer",
                      }}
                    >
                      Balance:
                      <span className="ml-2">
                        {zCFABal?.toLocaleString(undefined, {
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    </p>
                  )}
                  {toZAsset === "zZAR" && (
                    <p
                      onClick={() => setToAmount(zZARBal)}
                      style={{
                        fontSize: 12,
                        cursor: "pointer",
                      }}
                    >
                      Balance:
                      <span className="ml-2">
                        {zZARBal?.toLocaleString(undefined, {
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    </p>
                  )}
                </div>
                {showToZAssets && (
                  <div
                    className="mt-2 text-font-grey cursor-pointer absolute rounded  select-assets"
                    style={{
                      marginLeft: 0,
                    }}
                  >
                    <div
                      className="flex p-2 mb-2 select-asset"
                      onClick={() => selectToZAsset("zUSD")}
                    >
                      <img src={ZUSD} alt="zusd" className="h-7" />
                      <p className="ml-2">ZUSD</p>
                    </div>
                    <div
                      className="flex p-2 mb-2 select-asset"
                      onClick={() => selectToZAsset("zNGN")}
                    >
                      <img src={ZNGN} alt="" className="h-7" />
                      <p className="ml-2">ZNGN</p>
                    </div>
                    <div
                      className="flex p-2 mb-2 select-asset"
                      onClick={() => selectToZAsset("zCFA")}
                    >
                      <img src={ZCFA} alt="" className="h-7" />
                      <p className="ml-2">ZCFA</p>
                    </div>
                    <div
                      className="flex p-2 mb-2 select-asset"
                      onClick={() => selectToZAsset("zZAR")}
                    >
                      <img src={ZZAR} alt="" className="h-7" />
                      <p className="ml-2">ZZAR</p>
                    </div>
                  </div>
                )}
                <input
                  type="number"
                  placeholder="0"
                  value={toAmount}
                  onChange={e => handleFields(e.target.value, "To")}
                  disabled={toZAsset && toZAsset ? false : true}
                />
              </div>
            </div>
            <div className="text-font-grey px-6 py-4 swap-details">
              {fromZAsset && toZAsset && (
                <>
                  <p className="mb-4">
                    1 {fromZAsset} = {rate?.toFixed(2)} {toZAsset}
                  </p>
                  <p className="mb-3">
                    <span className="font-bold mr-2">Trading fee:</span>
                    {fromAmount * 0.992} {toZAsset}
                  </p>
                  <p className="mb-3">
                    <span className="font-bold mr-2">Expected Output:</span>
                    {toAmount - fromAmount * 0.992} {toZAsset}
                  </p>
                </>
              )}

              <p>
                <span className="font-bold mr-2">Fees:</span>
                0.8%
              </p>
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
                      "Approve"
                    )}
                  </button>
                  <button
                    style={{
                      backgroundColor: stage === 2 ? "#f97f41" : "#ccc",
                    }}
                    onClick={handleSwap}
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
                      "Swap"
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
          <Transactions />
        </div>
      </MainLayout>
    </>
  );
}

export default Swap;
