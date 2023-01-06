/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import useConnector from "./useConnector";
import { config } from "../config";
import vault from "../contracts/vault.json";
import { useDispatch, useSelector } from "react-redux";
import {
  updateCollateral,
  updateUserCollateral,
} from "../redux/reducers/bakiReducer";

const useDeposit = () => {
  const { provider } = useConnector();
  const dispatch = useDispatch();
  const { address, activeCol } = useSelector((state: any) => state.baki);
  const [contract, setContract] = useState<any>(null);
  useEffect(() => {
    if (provider) {
      const signer = provider.getSigner();
      setContract(new ethers.Contract(config.vaultAddress, vault, signer));
    }
  }, [provider]);

  useEffect(() => {
    getValues();
  }, [contract]);

  const getValues = async () => {
    // Get Coll balance
    let ball = await contract.getBalance(config.USDC);
    dispatch(updateCollateral(Number(ball._hex) / 10 ** 18));
    let colBall = await contract.getUserCollateralBalance();
    dispatch(updateUserCollateral(Number(colBall._hex) / 10 ** 18));
  };
  const deposit = async (depositAmount: number, mintAmount: number) => {
    try {
      const tx = await contract?.depositAndMint(
        Number(depositAmount),
        Math.round(mintAmount)
      );
      await tx.wait();

      return true;
    } catch (err: any) {
      console.error(err.error);
      return false;
    }
  };

  const claimReward = async () => {
    try {
      const tx = await contract?.claimFees();
      await tx.wait();
      return true;
    } catch (err: any) {
      console.error(err.error);
      return false;
    }
  };

  return { deposit, claimReward };
};

export default useDeposit;
