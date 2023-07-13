/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import useConnector from "./useConnector";
import { config } from "../config";
import vault from "../contracts/vault.json";
import useSigner from "./useSigner";
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

const { contract } = useSigner();

  useEffect(() => {
    if (contract) {
    getLiquidations();
    }
  }, [contract]);

  const getLiquidations = async () => {
    try {
      dispatch(updateLiqLoading(true));

      const result: any[] = await contract?.getUserFromLiquidationZone();

      let liquidations: Array<{
        address: string;
        reward: number;
        requiredZUSD: number;
      }> = [];
      let liquidation = {
        address: "",
        reward: 0,
        requiredZUSD: 0,
      };

      for (let i = 0; i < result?.length; i++) {
        let res = await contract?.getPotentialTotalReward(result[i]);
        let required = await contract?.getUserDebt(result[i]);

        liquidation.address = result[i];
        liquidation.reward = Number(res._hex) * 10 ** -18;
        liquidation.requiredZUSD = required * 10 ** -18;
        liquidations.push(liquidation);
      }

      dispatch(updateLiqLoading(false));
      dispatch(updateLiquidations(liquidations));
    } catch (error) {
      console.error(error);
      dispatch(updateLiqLoading(false));
    }
  };
  // const manageUsersLiquidation = async () => {
  //   try {
  //     const result = await contract?.manageUsersInLiquidationZone();
  //     dispatch(updateLiquidations(result));
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const _liquidate = async (address: string) => {
    try {
      const result = await contract?.liquidate(address);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  return { _liquidate };
};

export default useLiquidations;
