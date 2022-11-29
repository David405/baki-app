import "./Borrow.css";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import ZUSD from "../../assets/ZUSD.png";
import CUSD from "../../assets/cUSD.png";
import AVAX from "../../assets/avax.png";
import { useEffect, useState } from "react";

function Borrow() {
  const [perVal, setPerVal] = useState<number>(0);
  const [onFocus, setOnFocus] = useState<boolean>(false);
  const [depositAmount, setDepositAmount] = useState<any>(0);
  const [mintAmount, setMintAmount] = useState<any>(0);
  const [stage, setStage] = useState<number>(1);
  const [show, setShow] = useState<boolean>(false);
  const [showAssets, setShowAssets] = useState<boolean>(false);
  const [asset, setAsset] = useState<string>("");

  const approve = () => {
    if (stage === 1) {
      setStage(2);
    }
  };
  const mint = () => {
    if (stage === 2) {
      setStage(1);
    }
  };

  useEffect(() => {
    if (depositAmount && mintAmount) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [depositAmount, mintAmount]);

  const selectAsset = (_asset: string) => {
    setAsset(_asset);
    setShowAssets(false);
  };
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
                Balance: 0
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
                <button
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
                </button>
                {showAssets && (
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
                )}
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
            onClick={() => setPerVal(10)}
            style={{
              borderColor: perVal === 10 ? "#2595FF" : "#dbdedf",
              color: perVal === 10 ? "#2595FF" : "#5A5A65",
              borderWidth: perVal === 10 ? 2 : 1,
            }}
          >
            10%
          </button>
          <button
            onClick={() => setPerVal(25)}
            style={{
              borderColor: perVal === 25 ? "#2595FF" : "#dbdedf",
              color: perVal === 25 ? "#2595FF" : "#5A5A65",
              borderWidth: perVal === 25 ? 2 : 1,
            }}
          >
            25%
          </button>
          <button
            onClick={() => setPerVal(50)}
            style={{
              borderColor: perVal === 50 ? "#2595FF" : "#dbdedf",
              color: perVal === 50 ? "#2595FF" : "#5A5A65",
              borderWidth: perVal === 50 ? 2 : 1,
            }}
          >
            50%
          </button>
          <button
            onClick={() => {
              setPerVal(75);
              setOnFocus(false);
            }}
            style={{
              borderColor: perVal === 75 ? "#2595FF" : "#dbdedf",
              color: perVal === 75 ? "#2595FF" : "#5A5A65",
              borderWidth: perVal === 75 ? 2 : 1,
            }}
          >
            75%
          </button>
          <div
            className="custom"
            onClick={() => {
              setPerVal(0);
              setOnFocus(true);
            }}
            style={{
              borderColor: onFocus ? "#2595FF" : "#dbdedf",
              borderWidth: onFocus ? 2 : 1,
            }}
          >
            <input type="number" placeholder="Custom" />
          </div>
        </div>
        <div className="position flex-1">
          <div className="flex flex-col justify-center items-center">
            <p className="heading">Deposit Value</p>
            <p className="font-bold ">$0.00</p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <p className="heading">Safe Position</p>
            <div className="indicator"></div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <p className="heading">cRatio</p>
            <p>1.5</p>
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
              onClick={approve}
            >
              Approve Collateral
            </button>
            <button
              style={{
                backgroundColor: stage === 2 ? "#f97f41" : "#ccc",
              }}
              onClick={mint}
            >
              Deposit & Mint
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
