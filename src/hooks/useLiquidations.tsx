/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import useConnector from "./useConnector";
import { config } from "../config";
import vault from "../contracts/vault.json";
import { useDispatch, useSelector } from "react-redux";
import {
  updateLiquidations,
  updateLiqLoading,
} from "../redux/reducers/bakiReducer";
declare const window: any;

const useLiquidations = () => {
  const { provider } = useConnector();
  const dispatch = useDispatch();
  const { address, rewardBal, userDebt } = useSelector(
    (state: any) => state.baki
  );
  const [contract, setContract] = useState<any>(null);
  useEffect(() => {
    if (provider) {
      const signer = provider.getSigner();
      setContract(new ethers.Contract(config.vaultAddress, vault, signer));
    }
  }, [provider]);

  useEffect(() => {
    getLiquidations();
  }, [contract]);

  const getLiquidations = async () => {
    try {
      dispatch(updateLiqLoading(true));
      const result: any[] = await contract?.getUserFromLiquidationZone();

      let liquidations: Array<{ address: string; value: number }> = [];
      let liquidation = {
        address: "",
        value: 0,
      };

      for (let i = 0; i < result?.length; i++) {
        console.log(result[i]);
        let res = await contract?.getPotentialTotalReward(result[i]);

        liquidation.address = result[i];
        liquidation.value = Number(res._hex) * 10 ** -18;
        liquidations.push(liquidation);
      }

      dispatch(updateLiqLoading(false));
      dispatch(updateLiquidations(liquidations));
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

  const liquidateNow = async (address: string) => {
    try {
      const result = await contract?.liquidate(address);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  return { liquidateNow };
};

export default useLiquidations;
