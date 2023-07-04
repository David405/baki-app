import baki from "../../assets/baki.png";

import "./Error.css";
const NoChain = () => {
  return (
    <div className="error">
      <img src={baki} alt="" height="26" width="200" />
      <p className="title">
        Infinite Liquidity FX Exchange for African Currencies
      </p>
      <img src="/images/network.png" alt="" height="26" width="200" />
      <p className="sub-title">Sorry! This browser does not support dapps.</p>
      <p className="sub-title">
        Please use Chrome or Firefox then install metamask extension or use the
        Brave browser.
      </p>
    </div>
  );
};

export default NoChain;
