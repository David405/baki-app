import { ethers } from "ethers";
import { useEffect, useState } from "react";
import useConnector from "./useConnector";
import { config } from "../config";
import vault from "../contracts/vault.json";
declare const window: any;
function useWithdraw() {
  const { provider } = useConnector();
  const [contract, setContract] = useState<any>(null);
  useEffect(() => {
    if (provider) {
      const signer = provider.getSigner();
      setContract(new ethers.Contract(config.vaultAddress, vault, signer));
    }
  }, [provider]);
  const withdraw = async (
    _amountToRepay: number,
    _amountToWithdraw: number,
    _zToken: string
  ) => {
    try {
      const tx = await contract.repayAndWithdraw(
        _amountToRepay,
        _amountToWithdraw,
        _zToken
      );
      await tx.wait();
      alert("Transaction was successfull !!");
      window.location.reload();
    } catch (err: any) {
      alert(err.error.message);
    }
  };
  return { withdraw };
}

export default useWithdraw;
