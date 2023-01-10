import React from "react";
import MainLayout from "../../../layouts/MainLayout";
import "./Liquidation.css";
function Liquidation() {
  return (
    <MainLayout>
      <div className="liquidation">
        <div className="li-header">
          <p className="font-bold">Liquidations</p>
        </div>
        <div className="flex justify-around p-3">
          <div className="detail">
            <p className="font-bold">Owner</p>
          </div>
          <div className="detail">
            <div className="sub-detail">
              <p className="font-bold">Collateral</p>
            </div>
          </div>
          <div className="detail">
            <div className="sub-detail">
              <p className="font-bold text-lg">Debt</p>
            </div>
          </div>
          <div className="detail">
            <p className="font-bold">Coll Ratio</p>
          </div>
          <div className="detail ">
            <p className="font-bold">Actions</p>
          </div>
        </div>

        <div className="flex justify-around p-3">
          <div className="detail">
            <p>0xdkekjkj...dsd</p>
          </div>
          <div className="detail mr-10">
            <div className="sub-detail">
              <p className="text-font-grey">USDC</p>
            </div>
            <p>0.00</p>
          </div>
          <div className="detail mr-10">
            <div className="sub-detail">
              <p className="text-font-grey">TSD</p>
            </div>
            <p>0.00</p>
          </div>
          <div className="detail mr-10">
            <p>10%</p>
          </div>
          <button className="liquidate bg-dark-orange p-2 rounded text-white ">
            Liquidate
          </button>
        </div>
      </div>
    </MainLayout>
  );
}

export default Liquidation;
