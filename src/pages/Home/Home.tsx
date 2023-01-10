/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import baki from "../../assets/baki.png";
import "./Home.css";
import { Link } from "react-router-dom";
function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-red-100 ">
      <img src={baki} alt="" className="" />
      <div className="flex justify-around mt-6 w-80">
        <Link to="/mint">
          <button className="rounded-full text-white border-1 p-2 bg-dark-orange  h-46 enter-app">
            Enter App
          </button>
        </Link>
        <a href="https://docs.jollof.fi/products/baki" target="_blank">
          <button
            className="rounded-full p-2 h-46 learn"
            style={{
              borderWidth: 1,
              borderColor: "#000",
            }}
          >
            Learn More
          </button>
        </a>
      </div>
      <div className="flex mt-12 w-3/5 justify-center">
        <div className="p-4 flex justify-center items-center w-1/5 flex-col home-detail">
          <div className="text-lg text-dark-orange font-bold">$0.00</div>
          <p className="text-xs">Global Collateral</p>
        </div>
        <div className="p-4 flex justify-center items-center w-1/5 flex-col home-detail">
          <div className="text-lg text-dark-orange  font-bold">$0.00</div>
          <p className="text-xs">zToken Market Cap</p>
        </div>
        <div className="p-4 flex justify-center items-center w-1/5 flex-col home-detail">
          <div className="text-lg text-dark-orange font-bold">$0.00</div>
          <p className="text-xs">Total Volume</p>
        </div>
        <div className="p-4 flex text-dark-orange justify-center items-center w-1/5 flex-col home-last-item">
          <div className="text-lg font-bold">$0.00</div>
          <p className="text-xs">Trading Fees</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
