import React from "react";
import "./Portfolio.css";
import Chart from "react-apexcharts";
// import TradingViewWidget from 'react-tradingview-widget';

function Portfolio() {
  const options = {
    chart: {
      id: "basic-bar",
      stroke: {
        curve: "straight",
      },
      colors: ["#2595FF"],
      toolbar: {
        show: false,
      },
    },

    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
    },
  };
  const series = [
    {
      name: "series-1",
      data: [30, 40, 45, 50, 49, 60, 70, 91],
    },
  ];
  return (
    <div>
      <h1 className="font-bold">Portfolio</h1>
      <div className="chart mt-3">
        <Chart
          options={options}
          series={series}
          type="area"
          width="700"
          height="350"
        />
      </div>
    </div>
  );
}

export default Portfolio;
