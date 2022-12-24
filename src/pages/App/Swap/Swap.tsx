import { useEffect, useState } from "react";
import MainLayout from "../../../layouts/MainLayout";
import swapArrow from "../../../assets/swap-arr.png";
import ZUSD from "../../../assets/ZUSD.png";
import ZNGN from "../../../assets/ZNGN.png";
import ZCFA from "../../../assets/ZXAF.png";
import ZZAR from "../../../assets/ZZAR.png";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import "./Swap.css";
import useToken from "../../../hooks/useToken";
import useSwap from "../../../hooks/useSwap";
function Swap() {
  const [fromAmount, setFromAmount] = useState<any>(0);
  const [toAmount, setToAmount] = useState<any>(0);
  const [stage, setStage] = useState<number>(1);
  const [show, setShow] = useState<boolean>(false);
  const [showFromZAssets, setShowFromZAssets] = useState<boolean>(false);
  const [showToZAssets, setShowToZAssets] = useState<boolean>(false);
  const [fromZAsset, setFromZAsset] = useState<string>("");
  const [toZAsset, setToZAsset] = useState<string>("");
  const [loadingApprove, setLoadingApprove] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { approve } = useToken();
  const { swap } = useSwap();

  const handleApprove = async () => {
    if (fromZAsset === toZAsset) return;
    if (stage === 1) {
      setLoadingApprove(true);
      let result = await approve(fromAmount, fromZAsset);
      if (result) {
        setStage(2);
        setLoadingApprove(false);
      } else {
        setLoadingApprove(false);
        alert("Approval failed !!");
      }
    }
  };
  const handleSwap = async () => {
    if (fromZAsset === toZAsset) return;
    if (fromAmount && toAmount && stage === 2) {
      setLoading(true);
      await swap(fromAmount, fromZAsset, toZAsset);
      setLoading(false);
      setStage(1);
    }
  };

  const handleFields = (_value: string, _field: string) => {
    if (_field === "To") {
      setToAmount(_value);
      setFromAmount(Number(_value) * 2);
    } else if (_field === "From") {
      setFromAmount(_value);
      setToAmount(Number(_value) * 2);
    }
  };
  useEffect(() => {
    if (fromAmount && toAmount) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [fromAmount, toAmount]);

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
                <button
                  className="swap-assets rounded-full"
                  onClick={() => setShowFromZAssets(!showFromZAssets)}
                >
                  <span className="flex items-center">
                    {fromZAsset && (
                      <>
                        {fromZAsset === "ZUSD" && (
                          <img src={ZUSD} alt="ZUSD" className="h-7" />
                        )}
                        {fromZAsset === "ZNGN" && (
                          <img src={ZNGN} alt="ZNGN" className="h-7" />
                        )}
                        {fromZAsset === "ZCFA" && (
                          <img src={ZCFA} alt="ZCFA" className="h-7" />
                        )}
                        {fromZAsset === "ZZAR" && (
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
                    <AiOutlineUp size={18} color={"#5A5A65"} className="mr-2" />
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
                    className="mt-2 text-font-grey cursor-pointer absolute rounded  select-assets"
                    style={{
                      marginLeft: 0,
                    }}
                  >
                    <div
                      className="flex p-2 mb-2 select-asset"
                      onClick={() => selectFromZAsset("ZUSD")}
                    >
                      <img src={ZUSD} alt="zusd" className="h-7" />
                      <p className="ml-2">ZUSD</p>
                    </div>
                    <div
                      className="flex p-2 mb-2 select-asset"
                      onClick={() => selectFromZAsset("ZNGN")}
                    >
                      <img src={ZNGN} alt="" className="h-7" />
                      <p className="ml-2">ZNGN</p>
                    </div>
                    <div
                      className="flex p-2 mb-2 select-asset"
                      onClick={() => selectFromZAsset("ZCFA")}
                    >
                      <img src={ZCFA} alt="" className="h-7" />
                      <p className="ml-2">ZCFA</p>
                    </div>
                    <div
                      className="flex p-2 mb-2 select-asset"
                      onClick={() => selectFromZAsset("ZZAR")}
                    >
                      <img src={ZZAR} alt="" className="h-7" />
                      <p className="ml-2">ZZAR</p>
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
                <button
                  className="swap-assets rounded-full"
                  onClick={() => setShowToZAssets(!showToZAssets)}
                >
                  <span className="flex items-center">
                    {toZAsset && (
                      <>
                        {toZAsset === "ZUSD" && (
                          <img src={ZUSD} alt="ZUSD" className="h-7" />
                        )}
                        {toZAsset === "ZNGN" && (
                          <img src={ZNGN} alt="ZNGN" className="h-7" />
                        )}
                        {toZAsset === "ZCFA" && (
                          <img src={ZCFA} alt="ZCFA" className="h-7" />
                        )}
                        {toZAsset === "ZZAR" && (
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
                    <AiOutlineUp size={18} color={"#5A5A65"} className="mr-2" />
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
                    className="mt-2 text-font-grey cursor-pointer absolute rounded  select-assets"
                    style={{
                      marginLeft: 0,
                    }}
                  >
                    <div
                      className="flex p-2 mb-2 select-asset"
                      onClick={() => selectToZAsset("ZUSD")}
                    >
                      <img src={ZUSD} alt="zusd" className="h-7" />
                      <p className="ml-2">ZUSD</p>
                    </div>
                    <div
                      className="flex p-2 mb-2 select-asset"
                      onClick={() => selectToZAsset("ZNGN")}
                    >
                      <img src={ZNGN} alt="" className="h-7" />
                      <p className="ml-2">ZNGN</p>
                    </div>
                    <div
                      className="flex p-2 mb-2 select-asset"
                      onClick={() => selectToZAsset("ZCFA")}
                    >
                      <img src={ZCFA} alt="" className="h-7" />
                      <p className="ml-2">ZCFA</p>
                    </div>
                    <div
                      className="flex p-2 mb-2 select-asset"
                      onClick={() => selectToZAsset("ZZAR")}
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
              <p className="mb-4">1zUSD = 1 zNGN</p>
              <p className="mb-3">
                <span className="font-bold mr-2">Expected Output:</span>{" "}
                0.00zNGN
              </p>
              <p>
                <span className="font-bold mr-2">Liquidity Provider fee:</span>
                0.3%
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
                    {loadingApprove ? "Loading..." : "Approve"}
                  </button>
                  <button
                    style={{
                      backgroundColor: stage === 2 ? "#f97f41" : "#ccc",
                    }}
                    onClick={handleSwap}
                  >
                    {loading ? "Loading..." : "Swap"}
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
        </div>
      </MainLayout>
    </>
  );
}

export default Swap;
