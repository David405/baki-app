/* eslint-disable @typescript-eslint/no-unused-vars */
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import useConnector from "./useConnector";
import { config } from "../config";
import oracle from "../contracts/oracle.json";

function useOracle() {
  const { provider } = useConnector();
  const [contract, setContract] = useState<any>(null);

  useEffect(() => {
    if (provider) {
      const signer = provider.getSigner();
      setContract(new ethers.Contract(config.oracleAddress, oracle, signer));
    }
  }, [provider]);

  const getNGNUSD = () => {};
  const getXAFUSD = () => {};
  const getZARUSD = () => {};
  const getCOLUSD = () => {};
  return {
    getCOLUSD,
    getXAFUSD,
    getZARUSD,
    getNGNUSD,
  };
}

export default useOracle;
