/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import useConnector from "./useConnector";
import { config } from "../config";
import vault from "../contracts/vault.json";
import { useDispatch, useSelector } from "react-redux";
import { updateLiquidations } from "../redux/reducers/bakiReducer";
declare const window: any;

const useLiquidations = () => {
  const { provider } = useConnector();
  const dispatch = useDispatch();
  const { address, rewardBal } = useSelector((state: any) => state.baki);
  const [contract, setContract] = useState<any>(null);
  useEffect(() => {
    if (provider) {
      const signer = provider.getSigner();
      setContract(new ethers.Contract(config.vaultAddress, vault, signer));
    }
  }, [provider]);

  useEffect(() => {
    getLiquidations();
    manageUsersLiquidation();
  }, [contract]);

  const getLiquidations = async () => {
    try {
      const result = await contract?.getUserFromLiquidationZone();
      dispatch(updateLiquidations(result));
    } catch (error) {
      console.error(error);
    }
  };
  const manageUsersLiquidation = async () => {
    try {
      const result = await contract?.manageUsersInLiquidationZone();
      dispatch(updateLiquidations(result));
    } catch (error) {
      console.error(error);
    }
  };

  const liquidateNow = async () => {
    try {
      const result = await contract?.liquidate();

      dispatch(updateLiquidations(result));
    } catch (error) {
      console.error(error);
    }
  };

  return { liquidateNow };
};

export default useLiquidations;
