import { ethers } from "ethers";
import { useEffect, useState } from "react";
import useConnector from "./useConnector";
import { config } from "../config";
import vault from "../contracts/vault.json";
declare const window: any;

const useDeposit = () => {
  const { provider } = useConnector();
  const [contract, setContract] = useState<any>(null);
  useEffect(() => {
    if (provider) {
      const signer = provider.getSigner();
      setContract(new ethers.Contract(config.vaultAddress, vault, signer));
    }
  }, [provider]);
  const deposit = async (depositAmount: number, mintAmount: number) => {
    try {
      const tx = await contract?.depositAndMint(
        Number(depositAmount),
        Math.round(mintAmount)
      );
      await tx.wait();
      alert("Transaction was successfull !!");
      window.location.reload();
    } catch (err: any) {
      alert(err.error.message);
    }
  };

  const claimReward = async () => {
    try {
      const tx = await contract?.claimFees();
      await tx.wait();
      alert("Successfully claimed rewards !!");
      window.location.reload();
    } catch (err: any) {
      console.log(err.error);
      alert(err.error.message);
    }
  };

  return { deposit, claimReward };
};

export default useDeposit;
