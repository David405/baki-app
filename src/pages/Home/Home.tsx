/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-empty-pattern */
/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect, useState } from "react";
import baki from "../../assets/baki.png";
import "./Home.css";
import { Link } from "react-router-dom";
// import useConnector from "../../hooks/useConnector";
import millify from "millify";
import { useSelector } from "react-redux";
import useData from "../../hooks/useData";
import useProvider from "../../hooks/useProvider";
import { ethers } from "ethers";

function Home() {
  const test = useData();
  const { contract } = useProvider();

  const [totalVolume, setTotalVolume] = useState<number>(0);
  const [totalCollateral, setTotalCollateral] = useState<number>(0);
  const [globalDebt, setGlobalDebt] = useState<number>(0);

  useEffect(() => {
    if (contract) {
      contract
        ?.totalSwapVolume()
        .then((result: number) => {
          setTotalVolume(parseInt(ethers.utils.formatUnits(result, 0)));
        })
        .catch((error: any) => {
          console.log(error);
        });

      contract
        ?.totalCollateral()
        .then((result: number) => {
          setTotalCollateral(parseInt(ethers.utils.formatUnits(result, 0)));
        })
        .catch((error: any) => {
          console.log(error);
        });

      contract
        ?.getGlobalDebt()
        .then((result: number) => {
          setGlobalDebt(parseInt(ethers.utils.formatUnits(result, 0)));
        })
        .catch((error: any) => {
          console.log(error);
        });
    }
  }, [contract]);
  // const { totalVolume, totalCollateral } = useSelector(
  //   (state: any) => state.baki
  // );
  return (
    <div className="flex flex-col justify-center items-center h-screen landing">
      <img src={baki} alt="" height="26" width="200" />
      <p className="title">
        Infinite Liquidity FX Exchange for African Currencies
      </p>
      <p className="sub-title">
        Baki provides the ability to offer infinite liquidity at the official
        conversion rate, and natively quote assets in local currencies on chain.
      </p>
      <div className="flex mt-12 w-3/5 justify-center">
        <div className="p-4 flex justify-center items-center w-1/5 flex-col home-detail">
          <div className="text-lg font-bold">
            $
            {millify(totalCollateral / 10 ** 18, {
              units: ["", "K", "M", "B", "T", "P", "E"],
              space: false,
            })}
          </div>
          <p className="text-xs">Global Collateral</p>
        </div>
        <div className="p-4 flex justify-center items-center w-1/5 flex-col home-detail">
          <div className="text-lg  font-bold">
            {" "}
            $
            {millify(globalDebt / 10 ** 18, {
              units: ["", "K", "M", "B", "T", "P", "E"],
              space: true,
            })}
          </div>
          <p className="text-xs">zToken Market Cap</p>
        </div>
        <div className="p-4 flex justify-center items-center w-1/5 flex-col home-detail">
          <div className="text-lg font-bold">
            $
            {millify(Number(totalVolume / 10 ** 15), {
              units: ["", "K", "M", "B", "T", "P", "E"],
              space: false,
            })}
          </div>
          <p className="text-xs">Trading Volume</p>
        </div>
        <div className="p-4 flex justify-center items-center w-1/5 flex-col home-last-item">
          <div className="text-lg font-bold">
            $
            {millify(Number(totalVolume / 10 ** 15) * 0.008, {
              units: ["", "K", "M", "B", "T", "P", "E"],
              space: false,
            })}
          </div>
          <p className="text-xs">Trading Fees</p>
        </div>
      </div>
      <div className="flex justify-around mt-12 w-80">
        <Link to="/mint">
          <button className="text-white enter-app">Go to App</button>
        </Link>
        <a href="https://docs.baki.exchange" target="_blank">
          <button
            className="learn"
            style={{
              borderWidth: 1,
              borderColor: "#000",
              marginLeft: 20,
            }}
          >
            Learn More
            <img src="/images/i_arrow_up.png" alt="" />
          </button>
        </a>
      </div>
    </div>
  );
}

export default Home;
