/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useDispatch } from "react-redux";
import { updateAddress, updateNetwork } from "../redux/reducers/bakiReducer";
import { useNavigate } from "react-router-dom";
declare const window: any;

function useConnector() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [provider, setProvider] = useState<any>(null);
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });
      window.ethereum.on("accountsChanged", () => {
        window.location.reload();
      });
    }
  });
  useEffect(() => {
    // check Connection
    checkConnection();
    // Set Provider
    setProvider(new ethers.providers.Web3Provider(window.ethereum));
  }, []);

  useEffect(() => {
    // Check Network
    checkNetwork();
  }, [provider]);

  const checkNetwork = async () => {
    try {
      const network = await provider.getNetwork();
      if (network.chainId !== 43113) return navigate("/error");

      dispatch(updateNetwork(network));
    } catch (error) {}
  };

  const connectWallet = async () => {
    provider
      .send("eth_requestAccounts")
      .then(async (result: Array<string>) => {
        localStorage.setItem("baki_user", result[0]);
        dispatch(updateAddress(result[0]));
      })
      .catch((error: any) => {
        console.error(error);
      });
  };
  const changeNetwork = async () => {};
  function checkConnection() {
    window.ethereum
      .request({ method: "eth_accounts" })
      .then(handleAccountsChanged)
      .catch(console.error);
  }
  function handleAccountsChanged(accounts: any) {
    if (accounts.length === 0 && window.location.pathname !== "/") {
      dispatch(updateAddress(""));
    } else {
      dispatch(updateAddress(accounts[0]));
      checkNetwork();
    }
  }

  return {
    connectWallet,
    changeNetwork,
    provider,
  };
}

export default useConnector;
