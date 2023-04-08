import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ethers } from "ethers";
import { config } from "../config";
import faucet from "../contracts/faucet.json";
import useConnector from "./useConnector";
import { toast } from "react-toastify";

const useFaucet = () => {
  const { address } = useSelector((state: any) => state.baki);
  const [_address, setAddress] = useState<string>();
  const { provider } = useConnector();
  const [contract, setContract] = useState<any>(null);

  useEffect(() => {
    if (provider) {
      const signer = provider.getSigner();
      setContract(new ethers.Contract(config.faucetAddress, faucet, signer));
    }
  }, [provider]);

  const getUSDC = async () => {
    try {
      await contract.getUSDC(address);
      toast.success("Transaction Successful !!");
    } catch (error) {
      console.error(error);
      toast.error("Transaction Failed !!");
    }
  };
  const myWallet = () => {
    setAddress(address);
  };
  return { getUSDC, _address, setAddress, myWallet };
};

export default useFaucet;
