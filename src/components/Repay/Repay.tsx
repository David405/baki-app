import { useEffect, useState } from "react";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import ZUSD from "../../assets/ZUSD.png";
import ZNGN from "../../assets/ZNGN.png";
import ZCFA from "../../assets/ZXAF.png";
import ZZAR from "../../assets/ZZAR.png";
import CUSD from "../../assets/cUSD.png";
import AVAX from "../../assets/avax.png";
import "./Repay.css";
import useToken from "../../hooks/useToken";
import { config } from "../../config";
import useWithdraw from "../../hooks/useWithdraw";

function Repay() {
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

  const { approve } = useToken();
  const { withdraw } = useWithdraw();

  const handleApprove = async () => {
    if (stage === 1) {
      setLoadingApprove(true);
      let result = await approve(zTokenAmount, zAsset);
      if (result) {
        setStage(2);
        setLoadingApprove(false);
      } else {
        setLoadingApprove(false);
        alert("Approval failed !!");
      }
    }
  };
  const repay = async () => {
    if (stage === 2) {
      let zToken = "";
      if (zAsset === "zUSD") {
        zToken = config.zUSD;
      } else if (zAsset === "zNGN") {
        zToken = config.zNGN;
      } else if (zAsset === "zCFA") {
        zToken = config.zXAF;
      } else if (zAsset === "zZAR") {
        zToken = config.zZAR;
      }
      setLoading(true);
      await withdraw(Number(zTokenAmount), Number(colAmount), zToken);
      setZTokenAmount(0);
      setColAmount(0);
      setStage(1);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (zTokenAmount && colAmount) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [zTokenAmount, colAmount]);

  const selectZAsset = (_asset: string) => {
    setZAsset(_asset);
    setShowZAssets(false);
  };
  const selectColAsset = (_asset: string) => {
    setColAsset(_asset);
    setShowColAssets(false);
  };
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
              <p
                style={{
                  fontSize: 12,
                }}
              >
                Balance: 0
              </p>
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
                      <p className="ml-2">ZUSD</p>
                    </div>
                    <div
                      className="flex p-2 mb-2 select-asset"
                      onClick={() => selectZAsset("ZNGN")}
                    >
                      <img src={ZNGN} alt="" className="h-7" />
                      <p className="ml-2">ZNGN</p>
                    </div>
                    <div
                      className="flex p-2 mb-2 select-asset"
                      onClick={() => selectZAsset("ZCFA")}
                    >
                      <img src={ZCFA} alt="" className="h-7" />
                      <p className="ml-2">ZCFA</p>
                    </div>
                    <div
                      className="flex p-2 mb-2 select-asset"
                      onClick={() => selectZAsset("ZZAR")}
                    >
                      <img src={ZZAR} alt="" className="h-7" />
                      <p className="ml-2">ZZAR</p>
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
            <div>
              <p>Withdraw Collateral</p>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <button
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
                )}
              </div>
              <input
                style={{
                  marginLeft: 70,
                }}
                value={colAmount}
                type="number"
                placeholder="0"
                onChange={e => setColAmount(e.target.value)}
                disabled={colAsset ? false : true}
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
              {loadingApprove ? "Loading ..." : "   Approve"}
            </button>
            <button
              style={{
                backgroundColor: stage === 2 ? "#f97f41" : "#ccc",
              }}
              onClick={repay}
            >
              {loading ? "Loading ..." : "Repay"}
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
