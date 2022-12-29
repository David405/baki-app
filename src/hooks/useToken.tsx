/* eslint-disable react-hooks/exhaustive-deps */
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import useConnector from "./useConnector";
import { config } from "../config";
import cUSD from "../contracts/cUSD.json";
import zToken from "../contracts/zToken.json";

function useToken(asset: string, zAsset: boolean) {
  const { provider } = useConnector();
  const [contract, setContract] = useState<any>(null);

  useEffect(() => {
    if (provider && asset) {
      const signer = provider.getSigner();
      if (zAsset) {
        setContract(new ethers.Contract(config[asset], zToken, signer));
      } else {
        if (asset === "cUSD") {
          setContract(new ethers.Contract(config[asset], cUSD, signer));
        }
        if (asset === "USDC") {
          setContract(new ethers.Contract(config[asset], cUSD, signer));
        }
      }
    }
  }, [provider, asset]);

  const approve = async (_depositAmount: number, _collateral: string) => {
    try {
      const multiple = 10 ** 18;
      let amount = BigInt(_depositAmount * multiple);
      const tx = await contract.approve(config.vaultAddress, amount);
      await tx.wait();
      return true;
    } catch (error) {
      return false;
    }
  };
  return { approve };
}

export default useToken;
