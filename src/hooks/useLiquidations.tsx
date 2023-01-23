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
      const result = await contract?.getUserFromLiquidationZone();
      let liquidations: Array<{ address: string; value: number }> = [];
      let liquidation = {
        address: "",
        value: 0,
      };
      if (result) {
        result?.map(async (user: any) => {
          let res = await contract?.getPotentialTotalReward(user);
          liquidation.address = user;
          liquidation.value = Number(res._hex) * 10 ** -18;
        });

        setTimeout(() => {
          dispatch(updateLiqLoading(false));
          liquidations.push(liquidation);
          console.log("liquidations", liquidations);
          dispatch(updateLiquidations(liquidations));
        }, 2000);
      } else {
        dispatch(updateLiquidations([]));
      }
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

      dispatch(updateLiquidations(result));
    } catch (error) {
      console.error(error);
    }
  };

  return { liquidateNow };
};

export default useLiquidations;
