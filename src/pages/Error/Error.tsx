import baki from "../../assets/baki.png";
import useConnector from "../../hooks/useConnector";

import "./Error.css";
const Error = () => {
  const { switchNetwork } = useConnector();
  return (
    <div className="error">
      <img src={baki} alt="" height="26" width="200" />
      <p className="title">
        Infinite Liquidity FX Exchange for African Currencies
      </p>
      <img src="/images/network.png" alt="" height="26" width="200" />
      <p className="sub-title">
        Sorry! Baki is currently not yet deployed to this network. Please switch
        to Avalanche Fuji Test Net
      </p>
      <button onClick={switchNetwork}>
        <p>Switch Network</p>
      </button>
    </div>
  );
};

export default Error;
