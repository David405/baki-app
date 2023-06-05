/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useEffect, useState } from "react";
import home from "../assets/home.png";
import homedark from "../assets/home-dark.png";
import mint from "../assets/mint.png";
import mintdark from "../assets/mint-dark.png";
import swap from "../assets/swap.png";
import swapdark from "../assets/swap-dark.png";
// import team from "../assets/team.png";
// import teamdark from "../assets/team-dark.png";
import liquidate from "../assets/liquidate.png";
import liquidatedark from "../assets/liquidate-dark.png";
import bakifooter from "../assets/footer-logo.png";
import { Link, useLocation } from "react-router-dom";
import "./MainLayout.css";
import notification from "../assets/notification.png";
// import settings from "../assets/settings.png";
// import help from "../assets/help.png";
import { useMediaQuery } from "react-responsive";
import { BiMenu, BiLeftArrowAlt } from "react-icons/bi";
import Notifications from "../components/Notifications/Notifications";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import ConnectWallet from "../components/ConnectWallet/ConnectWallet";
import avax from "../assets/avax.png";
import celo from "../assets/celo.png";
import { useSelector } from "react-redux";
import { config } from "../config";
import useConnector from "../hooks/useConnector";
import { ConnectKitButton } from "connectkit";

interface MainLayoutProps {
  children: React.ReactNode;
}
const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  const [route, setRoute] = useState<string>("home");
  const [viewNotifications, setViewNotifications] = useState<boolean>(false);
  const location: any = useLocation();
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 818px)" });
  const [openSidebar, setOpenSidebar] = useState<string>("-300px");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const { address, network } = useSelector((state: any) => state.baki);
  const [visibility, setVisibility] = useState<boolean>(false);
  const { disconnectWallet } = useConnector();

  const toggleSidebar = (_mode: boolean) => {
    setIsOpen(_mode);
    if (isOpen) {
      setOpenSidebar("0px");
    } else {
      setOpenSidebar("-300px");
    }
  };
  useEffect(() => {
    if (address) setVisibility(false);
  }, [address, network]);

  return (
    <div className="flex">
      <div
        style={{
          left: isTabletOrMobile ? openSidebar : 0,
        }}
        className={`w-72 h-screen bg-dark-blue flex flex-col sidebar`}
      >
        <div className="sidebar-top flex flex-col justify-center items-center">
          <img
            src="https://xsgames.co/randomusers/avatar.php?g=pixel"
            className="rounded-full"
            height={77}
            width={77}
            alt=""
          />
          <button
            style={{
              backgroundColor: "#1f2952",
            }}
            className="text-white mt-4 rounded-full px-5 py-1"
          >
            {address
              ? `${address?.slice(0, 5)} ... ${address?.slice(38, 42)}`
              : "Disconnected"}
          </button>
          {isTabletOrMobile && (
            <button
              className="text-white flex mt-3"
              onClick={() => toggleSidebar(!isOpen)}
            >
              <BiLeftArrowAlt size={24} color="white" />
              Close
            </button>
          )}
        </div>
        <div className="sidebar-bottom">
          {/* <Link to="/app">
            <div
              onMouseEnter={() => setRoute("home")}
              onMouseLeave={() => setRoute("")}
              className={`layout-route flex p-2 ${
                location.pathname === "/app" && "route-active"
              }`}
            >
              <img
                src={
                  route === "home" || location.pathname === "/app"
                    ? homedark
                    : home
                }
                alt="home"
              />
              <p className="ml-2 ">Home</p>
            </div>
          </Link> */}
          <a href="/mint">
            <div
              className={`layout-route flex p-2 ${
                location.pathname === "/mint" && "route-active"
              }`}
              onMouseEnter={() => setRoute("mint")}
              onMouseLeave={() => setRoute("")}
            >
              <img
                src={
                  route === "mint" || location.pathname === "/mint"
                    ? mintdark
                    : mint
                }
                alt=""
              />
              <p className="ml-2 ">My Position</p>
            </div>
          </a>
          <a href="/swap">
            <div
              className={`layout-route flex p-2 ${
                location.pathname === "/swap" && "route-active"
              }`}
              onMouseEnter={() => setRoute("swap")}
              onMouseLeave={() => setRoute("")}
            >
              <img
                src={
                  route === "swap" || location.pathname === "/swap"
                    ? swapdark
                    : swap
                }
                alt=""
              />
              <p className="ml-2 ">Swap</p>
            </div>
          </a>
          <a href="/liquidation">
            <div
              className={`layout-route flex p-2 ${
                location.pathname === "/liquidation" && "route-active"
              }`}
              onMouseEnter={() => setRoute("liquidation")}
              onMouseLeave={() => setRoute("")}
            >
              <img
                src={
                  route === "liquidation" ||
                  location.pathname === "/liquidation"
                    ? liquidatedark
                    : liquidate
                }
                alt=""
              />
              <p className="ml-2 ">Liquidation</p>
            </div>
          </a>
          {/* <Link to="/app/transactions">
            <div
              className={`layout-route flex p-2 ${
                location.pathname === "/app/transactions" && "route-active"
              }`}
              onMouseEnter={() => setRoute("transactions")}
              onMouseLeave={() => setRoute("")}
            >
              <img
                src={
                  route === "transactions" ||
                  location.pathname === "/app/transactions"
                    ? teamdark
                    : team
                }
                alt="transactions"
              />
              <p className="ml-2 ">Transactions</p>
            </div>
          </Link> */}
        </div>
        <div className="sidebar-footer flex justify-center items-center">
          <a href="/">
            <img src={bakifooter} alt="logo" />
          </a>
        </div>
      </div>
      <div className="flex-1 h-screen">
        <div
          className="w-full flex justify-center bg-red-200"
          style={{
            backgroundColor: "#f97f41",
          }}
        >
          <p>
            <b> 😄 Request test USDC from the Canza Faucet 👉</b>
          </p>
          <a
            href="http://faucet.0vb.xyz"
            className="ml-2"
            target="_blank"
            rel="noreferrer"
          >
            Get test USDC
          </a>
        </div>
        <div className="flex justify-between p-5 ">
          {!isTabletOrMobile && (
            <div className=" relatively ml-3">
              <h1 className="font-bold text-lg">
                {location.pathname === "/" && "Hi there"}
                {location.pathname === "/mint" && "My Position"}
                {location.pathname === "/swap" && "Swap"}
                {location.pathname === "/liquidation" && "Liquidation"}
                {location.pathname === "/transactions" && "Transactions"}
              </h1>
              <p className="text-font-grey">
                {location.pathname === "/app" && "Explore your dashboard"}
                {location.pathname === "/mint" &&
                  "Select the asset you’d like to deposit"}
                {location.pathname === "/swap" && "Access Synthetic Assets"}
                {location.pathname === "/liquidation" && "Provide Liquidation"}
                {location.pathname === "/transactions" &&
                  "View your transaction history in the table below"}
              </p>
            </div>
          )}
          {isTabletOrMobile && (
            <button onClick={() => toggleSidebar(!isOpen)}>
              <BiMenu size={24} />
            </button>
          )}

          <div className="flex items-center">
            <button className="mr-6" onClick={() => setViewNotifications(true)}>
              {/* <div className="absolute bg-red-600 rounded-full h-3 w-3 flex justify-center items-center text-white ml-3">
                <p className="text-xs">1</p>
              </div> */}
              <img
                src={notification}
                alt="notification"
                style={{
                  width: 30,
                }}
              />
            </button>
            {/* <button className="mr-2">
              <img
                src={settings}
                alt="settings"
                style={{
                  height: 50,
                  width: 50,
                }}
              />
            </button>
            <button className="mr-2">
              <img
                src={help}
                alt="help"
                style={{
                  height: 50,
                  width: 50,
                }}
              />
            </button> */}
            <div>
              {address && (
                <button
                  onClick={() => setShow(!show)}
                  className="flex items-center mr-2 text-white rounded-lg px-2 py-2"
                  style={{
                    backgroundColor: "#0f257c",
                  }}
                >
                  <div className="flex">
                    {network.chainId === 43113 && (
                      <img src={avax} alt="avax" className="h-6" />
                    )}
                    {network.chainId === 44787 && (
                      <img src={celo} alt="celo" className="h-6" />
                    )}

                    <p className="ml-1">
                      {network.chainId === 43113 && "Avalanche"}
                      {network.chainId === 44787 && "Celo"}
                    </p>
                  </div>
                  {show ? (
                    <AiOutlineUp size={18} className="ml-6" />
                  ) : (
                    <AiOutlineDown size={18} className="ml-6" />
                  )}
                </button>
              )}
              {show && (
                <div className="text-white mt-2 p-1  cursor-pointer absolute w-10 networks">
                  {config.networks?.map((network: any, index: number) => (
                    <div key={index} className="flex p-2 mb-2 network">
                      <img
                        src={network.name === "Celo" ? celo : avax}
                        alt="celo"
                        className="h-6"
                      />

                      <p className="ml-2">{network.name}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <ConnectKitButton.Custom>
              {({
                isConnected,
                isConnecting,
                show,
                hide,
                address,
                ensName,
                chain,
              }) => {
                return (
                  <button
                    className="text-white bg-dark-orange rounded-full font-bold p-2  mr-2 "
                    onClick={show}
                  >
                    {isConnected
                      ? `${address?.slice(0, 10)}..${address?.slice(35, 42)}`
                      : " Connect Wallet"}
                  </button>
                );
              }}
            </ConnectKitButton.Custom>
            {/* {!address ? (
              <button
                onClick={() => setVisibility(true)}
                className="text-white bg-dark-orange rounded-full font-bold p-2  mr-2 "
              >
                Connect Wallet
              </button>
            ) : (
              <button
                onClick={disconnectWallet}
                className="text-white bg-grey rounded-full font-bold p-2  mr-2 "
              >
                Disconnect
              </button>
            )} */}
          </div>
        </div>
        <div className="p-4  layout-body">{children}</div>
      </div>

      <Notifications
        visible={viewNotifications}
        onClose={setViewNotifications}
      />
      <ConnectWallet
        visible={visibility}
        onClose={() => setVisibility(!visibility)}
      />
    </div>
  );
};

export default MainLayout;
