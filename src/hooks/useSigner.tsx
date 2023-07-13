import { useEffect, useState, useMemo } from "react";
import { config } from "../config";
import vaultAbi from "../contracts/vault.json";
import { ethers } from "ethers";

declare const window: any;

const useProvider = () => {
  const [contract, setContract] = useState<any>(null);

  const provider = useMemo(
    () => new ethers.providers.Web3Provider(window.ethereum),
    []
  );

  useEffect(() => {
    if (provider) {
      const signer = provider.getSigner();
      setContract(new ethers.Contract(config.vaultAddress, vaultAbi, signer));
    }
  }, [provider]);
  return { contract };
};

export default useProvider;
