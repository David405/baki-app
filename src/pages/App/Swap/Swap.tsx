/* eslint-disable react-hooks/exhaustive-deps */
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
import useOracle from "../../../hooks/useOracle";
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
  const test = useData();
  const [showFromZAssets, setShowFromZAssets] = useState<boolean>(false);
  const [showToZAssets, setShowToZAssets] = useState<boolean>(false);
  const [fromZAsset, setFromZAsset] = useState<string>("zUSD");
  const [toZAsset, setToZAsset] = useState<string>("zNGN");
  const [loadingApprove, setLoadingApprove] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [rate, setRate] = useState<number>(0);
  const [swapOutput, setSwapOutput] = useState<number>(0);
  const { approve, allowance } = useToken(fromZAsset, true);
  const { swap } = useSwap();
  const {
    getNGNUSD,
    getXAFUSD,
    getZARUSD,
    getCOLUSD,
    getNGNXAF,
    getZARXAF,
    getNGNZAR,
  } = useOracle();

  const { zUSDBal, zNGNBal, zCFABal, zZARBal, fee } = useSelector(
    (state: any) => state.baki
  );

  const getRates = async () => {
    try {
      let NGNUSDRate = await getNGNUSD();
      let XAFUSDRate = await getXAFUSD();
      let ZARUSDRate = await getZARUSD();
      let NGNXAFRate = await getNGNXAF();
      let ZARXAFRate = await getZARXAF();
      let NGNZARRate = await getNGNZAR();
      let COLUSDRate = await getCOLUSD();

      return {
        NGN: NGNUSDRate,
        XAF: XAFUSDRate,
        ZAR: ZARUSDRate,
        NGNXAF: NGNXAFRate,
        ZARXAF: ZARXAFRate,
        NGNZAR: NGNZARRate,
        USD: COLUSDRate,
      };
    } catch (error) {
      console.error(error);
    }
  };

  const handleApprove = async () => {
    if (loadingApprove) return;
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
    if (loading) return;

    if (fromZAsset === toZAsset) return;
    if (fromAmount && toAmount && stage === 2) {
      setLoading(true);
      const result = await swap(fromAmount, fromZAsset, toZAsset, swapOutput);

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
    if (fromAmount > allowance) {
      setStage(1);
    } else {
      setStage(2);
    }
  }, [fromAmount, toAmount, allowance]);

  useEffect(() => {
    if (fromAmount) {
      setLoading(true);
      setLoadingApprove(true);
      getRates()
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
          if (
            fromZAsset.substring(1) === "NGN" &&
            toZAsset.substring(1) === "USD"
          ) {
            setRate(1 / result.NGN);
            const output = (1 / result.NGN) * fromAmount;
            setSwapOutput(output);
          }

          if (
            fromZAsset.substring(1) === "ZAR" &&
            toZAsset.substring(1) === "USD"
          ) {
            setRate(1 / result.ZAR);
            const output = (1 / result.ZAR) * fromAmount;
            setSwapOutput(output);
          }

          if (
            fromZAsset.substring(1) === "CFA" &&
            toZAsset.substring(1) === "USD"
          ) {
            setRate(1 / result.XAF);
            const output = (1 / result.XAF) * fromAmount;
            setSwapOutput(output);
          }

          if (
            fromZAsset.substring(1) === "NGN" &&
            toZAsset.substring(1) === "CFA"
          ) {
            setRate(1 / result.NGNXAF);
            const output = (1 / result.NGNXAF) * fromAmount;
            setSwapOutput(output);
          }

          if (
            fromZAsset.substring(1) === "ZAR" &&
            toZAsset.substring(1) === "CFA"
          ) {
            setRate(1 / result.ZARXAF);
            const output = (1 / result.ZARXAF) * fromAmount;
            setSwapOutput(output);
          }
          if (
            fromZAsset.substring(1) === "CFA" &&
            toZAsset.substring(1) === "ZAR"
          ) {
            setRate(result.ZARXAF);
            const output = result.ZARXAF * fromAmount;
            setSwapOutput(output);
          }
          if (
            fromZAsset.substring(1) === "NGN" &&
            toZAsset.substring(1) === "ZAR"
          ) {
            setRate(1 / result.NGNZAR);
            const output = (1 / result.NGNZAR) * fromAmount;
            setSwapOutput(output);
          }
          if (
            fromZAsset.substring(1) === "ZAR" &&
            toZAsset.substring(1) === "NGN"
          ) {
            setRate(result.NGNZAR);
            const output = result.NGNZAR * fromAmount;
            setSwapOutput(output);
          }

          if (
            fromZAsset.substring(1) === "CFA" &&
            toZAsset.substring(1) === "NGN"
          ) {
            setRate(result.NGNXAF);
            const output = result.NGNXAF * fromAmount;
            setSwapOutput(output);
          }
          if (fromZAsset.substring(1) === toZAsset.substring(1)) {
            setRate(1);
            const output = 1 * fromAmount;
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
      getRates().then((res: any) => {
        if (fromZAsset.substring(1) === toZAsset.substring(1)) {
          return setRate(1);
        }
        if (
          fromZAsset.substring(1) === "NGN" &&
          toZAsset.substring(1) === "USD"
        ) {
          return setRate(1 / res?.NGN);
        }

        if (
          fromZAsset.substring(1) === "ZAR" &&
          toZAsset.substring(1) === "USD"
        ) {
          return setRate(1 / res?.ZAR);
        }

        if (
          fromZAsset.substring(1) === "CFA" &&
          toZAsset.substring(1) === "USD"
        ) {
          return setRate(1 / res?.XAF);
        }

        if (
          fromZAsset.substring(1) === "NGN" &&
          toZAsset.substring(1) === "CFA"
        ) {
          return setRate(1 / res?.NGNXAF);
        }

        if (
          fromZAsset.substring(1) === "ZAR" &&
          toZAsset.substring(1) === "CFA"
        ) {
          return setRate(1 / res?.ZARXAF);
        }
        if (
          fromZAsset.substring(1) === "CFA" &&
          toZAsset.substring(1) === "ZAR"
        ) {
          return setRate(res?.ZARXAF);
        }
        if (
          fromZAsset.substring(1) === "NGN" &&
          toZAsset.substring(1) === "ZAR"
        ) {
          return setRate(1 / res?.NGNZAR);
        }
        if (
          fromZAsset.substring(1) === "ZAR" &&
          toZAsset.substring(1) === "NGN"
        ) {
          return setRate(res?.NGNZAR);
        }

        if (
          fromZAsset.substring(1) === "CFA" &&
          toZAsset.substring(1) === "NGN"
        ) {
          return setRate(res?.NGNXAF);
        }

        setRate(Number(res?.NGN));
      });
    }
  }, [rate, toZAsset, fromZAsset, fromAmount]);

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
                <div className="flex justify-end">
                  {fromZAsset === "zUSD" && (
                    <p
                      onClick={() => setFromAmount(zUSDBal)}
                      className="mb-3"
                      style={{
                        fontSize: 12,
                        cursor: "pointer",
                      }}
                    >
                      <span className="font-bold">{fromZAsset} Balance:</span>
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
                      className="mb-3"
                      style={{
                        fontSize: 12,
                        cursor: "pointer",
                      }}
                    >
                      <span className="font-bold">{fromZAsset} Balance:</span>
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
                      className="mb-3"
                      style={{
                        fontSize: 12,
                        cursor: "pointer",
                      }}
                    >
                      <span className="font-bold">{fromZAsset} Balance:</span>
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
                      className="mb-3"
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

                <div className="flex justify-between">
                  <button
                    className="swap-assets "
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
                  {showFromZAssets && (
                    <div
                      className="mt-14 text-font-grey cursor-pointer absolute rounded  select-assets"
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
                    className="ml-2"
                    onChange={e => handleFields(e.target.value, "From")}
                    disabled={fromZAsset && toZAsset ? false : true}
                  />
                </div>
                <p className="swap-metrix mt-4 mb-4">
                  1 {fromZAsset} = {rate?.toFixed(2)} {toZAsset}
                </p>
                <p className="mb-4 swap-metrix">
                  <span className="mr-2">Fees:</span>
                  {fee}%
                </p>

                <button
                  style={{
                    background:
                      stage === 1 ? "#241f17" : "rgba(36, 31, 23, 0.17)",
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
                    "Approve"
                  )}
                </button>
              </div>
              <div className="swap-icon">
                <img src="/images/swap.jpg" alt="" />
              </div>
              <div className="asset-box">
                <div className="flex justify-end">
                  {toZAsset === "zUSD" && (
                    <p
                      onClick={() => setToAmount(zUSDBal)}
                      className="mb-3"
                      style={{
                        fontSize: 12,
                        cursor: "pointer",
                      }}
                    >
                      <span className="font-bold">{toZAsset} Balance:</span>
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
                      className="mb-3"
                      style={{
                        fontSize: 12,
                        cursor: "pointer",
                      }}
                    >
                      <span className="font-bold">{toZAsset} Balance:</span>
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
                      className="mb-3"
                      style={{
                        fontSize: 12,
                        cursor: "pointer",
                      }}
                    >
                      <span className="font-bold">{toZAsset} Balance:</span>
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
                      className="mb-3"
                      style={{
                        fontSize: 12,
                        cursor: "pointer",
                      }}
                    >
                      <span className="font-bold">{toZAsset} Balance:</span>
                      <span className="ml-2">
                        {zZARBal?.toLocaleString(undefined, {
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    </p>
                  )}
                </div>
                <div className="flex flex-col">
                  <div className="flex">
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
                    {showToZAssets && (
                      <div
                        className="mt-14 text-font-grey cursor-pointer absolute rounded  select-assets"
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
                      className="ml-3"
                      placeholder="0"
                      value={toAmount}
                      onChange={e => handleFields(e.target.value, "To")}
                      disabled={toZAsset && toZAsset ? false : true}
                    />
                  </div>
                  <p className="mt-4 mb-3 swap-metrix">
                    <span className="mr-2">Expected Output:</span>
                    {swapOutput - (swapOutput * fee) / 100} {toZAsset}
                  </p>
                  <p className="mb-3 swap-metrix">
                    <span className="mr-2">Trading fee:</span>
                    {(swapOutput * fee) / 100} {toZAsset}
                  </p>
                  <button
                    style={{
                      backgroundColor:
                        stage === 2 ? "#241f17" : "rgba(36, 31, 23, 0.17)",
                    }}
                    className="b-swap"
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
              </div>
            </div>
          </div>
          <Transactions />
        </div>
      </MainLayout>
    </>
  );
}

export default Swap;
