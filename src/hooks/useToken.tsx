/* eslint-disable react-hooks/exhaustive-deps */
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import useConnector from "./useConnector";
import { config } from "../config";
import USDC from "../contracts/USDC.json";
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
        if (asset === "USDC") {
          setContract(new ethers.Contract(config[asset], USDC, signer));
        }
      }
    }
  }, [provider, asset]);

  const approve = async (_depositAmount: number) => {
    try {
      const multiple = 10 ** 18;
      let amount = BigInt(_depositAmount * multiple);
      const tx = await contract.approve(config.vaultAddress, amount);
      await tx.wait();
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };
  return { approve };
}

export default useToken;
