import { ethers } from "ethers";
import { useEffect, useState } from "react";
import useConnector from "./useConnector";
import { config } from "../config";
import cUSD from "../contracts/cUSD.json";

function useToken() {
  const { provider } = useConnector();

  const [contract, setContract] = useState<any>(null);

  useEffect(() => {
    if (provider) {
      const signer = provider.getSigner();
      setContract(new ethers.Contract(config.cUSD, cUSD, signer));
    }
  }, [provider]);

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
