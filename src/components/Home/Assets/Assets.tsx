import React, { useState } from "react";
import CUSD from "../../../assets/cUSD.png";
import ZNGN from "../../../assets/ZNGN.png";
import ZXAF from "../../../assets/ZXAF.png";
import ZZAR from "../../../assets/ZZAR.png";
import ZUSD from "../../../assets/ZUSD.png";
import AVAX from "../../../assets/avax.png";
import "./Assets.css";

function Assets() {
  const [network] = useState<string>();
  return (
    <div className="ml-2">
      <h1 className="font-bold">Assets</h1>
      <div className="assets mt-3">
        <div className="asset flex justify-center items-center ">
          <img src={ZUSD} alt="ZUSD" className="h-7" />
          <div className="ml-2">
            <p className="font-bold">zUSD</p>
            <p
              style={{
                color: "grey",
              }}
            >
              212,00000
            </p>
          </div>
        </div>
        <div className="asset flex justify-center items-center ">
          <img src={ZNGN} alt="ZNGN" className="h-7" />
          <div className="ml-2">
            <p className="font-bold">zNGN</p>
            <p
              style={{
                color: "grey",
              }}
            >
              212,00000
            </p>
          </div>
        </div>
        <div className="asset flex justify-center items-center ">
          <img src={ZXAF} alt="ZCFA" className="h-7" />
          <div className="ml-2">
            <p className="font-bold">zCFA</p>
            <p
              style={{
                color: "grey",
              }}
            >
              212,00000
            </p>
          </div>
        </div>
        <div className="asset flex justify-center items-center ">
          <img src={ZZAR} alt="ZZAR" className="h-7" />
          <div className="ml-2">
            <p className="font-bold">zZAR</p>
            <p
              style={{
                color: "grey",
              }}
            >
              212,00000
            </p>
          </div>
        </div>

        <div className="asset flex justify-center items-center ">
          <img
            src={network === "Celo" ? CUSD : AVAX}
            alt={network}
            className="h-7"
          />
          <div className="ml-2">
            <p className="font-bold">{network === "Celo" ? "cUSD" : "AVAX"}</p>
            <p
              style={{
                color: "grey",
              }}
            >
              212,00000
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Assets;
