/* eslint-disable @typescript-eslint/no-unused-vars */
import { ethers } from "ethers";
import axios from "axios";
import { useEffect, useState } from "react";
import useConnector from "./useConnector";
import { config } from "../config";
import vault from "../contracts/vault.json";
declare const window: any;
function useSwap() {
  const { provider } = useConnector();
  const [contract, setContract] = useState<any>(null);
  useEffect(() => {
    if (provider) {
      const signer = provider.getSigner();
      setContract(new ethers.Contract(config.vaultAddress, vault, signer));
    }
  }, [provider]);
  const swap = async (
    _amount: number,
    _fromzToken: string,
    _tozToken: string
  ) => {
    let from = "";
    let to = "";

    if (_fromzToken === "zUSD") {
      from = config.zUSD;
    } else if (_fromzToken === "zCFA") {
      from = config.zXAF;
    } else if (_fromzToken === "zNGN") {
      from = config.zNGN;
    } else if (_fromzToken === "zZAR") {
      from = config.zZAR;
    }
    if (_tozToken === "zUSD") {
      to = config.zUSD;
    } else if (_tozToken === "zCFA") {
      to = config.zXAF;
    } else if (_tozToken === "zNGN") {
      to = config.zNGN;
    } else if (_tozToken === "zZAR") {
      to = config.zZAR;
    }

    try {
      const tx = await contract.swap(Number(_amount), from, to);
      await tx.wait();
      window.location.reload();
      return true;
    } catch (err: any) {
      console.error(err.error.message);
      return false;
    }
  };

  return { swap };
}

export default useSwap;
