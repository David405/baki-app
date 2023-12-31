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

  const getNGNUSD = async () => {
    const result = await contract?.getZTokenUSDValue("zngn");
    return Number(result?._hex) / 1000;
  };
  const getXAFUSD = async () => {
    const result = await contract?.getZTokenUSDValue("zxaf");
    return Number(result?._hex) / 1000;
  };
  const getZARUSD = async () => {
    const result = await contract?.getZTokenUSDValue("zzar");
    return Number(result?._hex) / 1000;
  };
  const getCOLUSD = async () => {
    const result = await contract?.collateralUSD();
    return Number(result?._hex) / 1000;
  };
  const getNGNXAF = async () => {
    const ngnusd = await getNGNUSD();
    const xafusd = await getXAFUSD();
    return ngnusd / xafusd;
  };
  const getZARXAF = async () => {
    const zarusd = await getZARUSD();
    const xafusd = await getXAFUSD();
    return zarusd / xafusd;
  };
  const getNGNZAR = async () => {
    const ngnusd = await getNGNUSD();
    const zarusd = await getZARUSD();
    return ngnusd / zarusd;
  };
  return {
    getCOLUSD,
    getXAFUSD,
    getZARUSD,
    getNGNUSD,
    getNGNXAF,
    getZARXAF,
    getNGNZAR,
  };
}

export default useOracle;
