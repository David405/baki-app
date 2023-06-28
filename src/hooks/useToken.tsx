/* eslint-disable react-hooks/exhaustive-deps */
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import useConnector from "./useConnector";
import { config } from "../config";
import USDC from "../contracts/USDC.json";
import zToken from "../contracts/zToken.json";
import { useAccount } from "wagmi";

function useToken(asset: string, zAsset: boolean) {
  const { provider } = useConnector();
  const { address } = useAccount();
  const [contract, setContract] = useState<any>(null);
  const [allowance, setAllowance] = useState<any>(null);

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

  useEffect(() => {
    checkAllowance();
  });

  const approve = async (_depositAmount: number) => {
    try {
      const tx = await contract.approve(
        config.vaultAddress,
        ethers.utils.parseUnits(String(_depositAmount), "ether"),
        {
          gasLimit: 100000,
        }
      );
      await tx.wait();
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const checkAllowance = async () => {
    const _allowance = await contract?.allowance(address, config.vaultAddress);

    setAllowance(Number(_allowance?._hex) / 10 ** 18);
  };
  return { approve, allowance };
}

export default useToken;
