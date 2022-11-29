import React from "react";
import MainLayout from "../../../layouts/MainLayout";
import "./Liquidation.css";
function Liquidation() {
  return (
    <MainLayout>
      <div className="liquidation">
        <div className="li-header">
          <p className="font-bold">Liquidations</p>
          <button className="liquidate bg-dark-orange p-2 rounded text-white">
            Liquidate
          </button>
        </div>
        <div className="flex justify-around p-3">
          <div className="detail">
            <p className="font-bold">Owner</p>
            <p>0xdkekjkj...dsd</p>
          </div>
          <div className="detail">
            <div className="sub-detail">
              <p className="font-bold">Collateral</p>
              <p className="text-font-grey">AVAX</p>
            </div>
            <p>0.00</p>
          </div>
          <div className="detail">
            <div className="sub-detail">
              <p className="font-bold text-lg">Debt</p>
              <p className="text-font-grey">TSD</p>
            </div>
            <p>0.00</p>
          </div>
          <div className="detail">
            <p className="font-bold">Coll Ratio</p>
            <p>10%</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default Liquidation;
