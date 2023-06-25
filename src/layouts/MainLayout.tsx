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
import { useAccount, useNetwork } from "wagmi";

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
  const { address } = useAccount();

  const toggleSidebar = (_mode: boolean) => {
    setIsOpen(_mode);
    if (isOpen) {
      setOpenSidebar("0px");
    } else {
      setOpenSidebar("-300px");
    }
  };

  return (
    <div className="flex">
      <div
        style={{
          left: isTabletOrMobile ? openSidebar : 0,
        }}
        className={`w-72 h-screen flex flex-col sidebar`}
      >
        <div className="sidebar-top flex flex-col justify-center items-center">
          <img
            src="https://xsgames.co/randomusers/avatar.php?g=pixel"
            className="rounded-full avatar"
            height={60}
            width={60}
            alt=""
          />
          <span className="avatar-active"></span>
          <ConnectKitButton.Custom>
            {({ isConnected, show }) => {
              return (
                <button
                  onClick={show}
                  style={{
                    backgroundColor: "#FB7F37",
                  }}
                  className="mt-4 rounded-full px-5 py-1"
                >
                  {address
                    ? `${address?.slice(0, 5)} ... ${address?.slice(38, 42)}`
                    : "Connect Wallet"}
                </button>
              );
            }}
          </ConnectKitButton.Custom>

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
                    ? "/images/position-dark.png"
                    : "/images/position-light.png"
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
                    ? "/images/swap-dark.png"
                    : "/images/swap-light.png"
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
                    ? "/images/liquidation-dark.png"
                    : "/images/liquidation-light.png"
                }
                alt=""
              />
              <p className="ml-2 ">Liquidation</p>
            </div>
          </a>
          <div
            style={{
              boxSizing: "border-box",
              width: 220,
              height: 1,
              marginLeft: "10%",
              border: "0.2px solid #ccc",
              marginBottom: 10,
            }}
          ></div>
          <a href="/">
            <div
              className={`layout-route flex p-2 `}
              onMouseEnter={() => setRoute("liquidation")}
              onMouseLeave={() => setRoute("")}
            >
              <img src="/images/leave.png" alt="" />
              <p className="ml-2 ">Leave App</p>
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
      <div className="flex-1 h-screen ">
        <div className="flex justify-between p-5 border-b-2 header">
          {!isTabletOrMobile && (
            <div className="relatively ml-3 mt-2">
              <h1 className="font-bold text-lg">
                {location.pathname === "/mint" && "Dashboard"}
                {location.pathname === "/swap" && "Swap"}
                {location.pathname === "/liquidation" && "Liquidation"}
                {location.pathname === "/transactions" && "Transactions"}
              </h1>
            </div>
          )}
          {isTabletOrMobile && (
            <button onClick={() => toggleSidebar(!isOpen)}>
              <BiMenu size={24} />
            </button>
          )}
          <div className="flex justify-around">
            <a
              href="http://faucet.0vb.xyz"
              className="ml-2 mr-6"
              target="_blank"
              rel="noreferrer"
            >
              <button className="get-test">Get Test USDC</button>
            </a>

            <div className="flex items-center">
              <button
                className="mr-6"
                onClick={() => setViewNotifications(true)}
              >
                {/* <div className="absolute bg-red-600 rounded-full h-3 w-3 flex justify-center items-center text-white ml-3">
                <p className="text-xs">1</p>
              </div> */}

                <img
                  src={notification}
                  alt="notification"
                  style={{
                    width: 25,
                  }}
                />
              </button>
            </div>
          </div>
        </div>
        <div className="p-4  layout-body">{children}</div>
      </div>

      <Notifications
        visible={viewNotifications}
        onClose={setViewNotifications}
      />
      {/* <ConnectWallet
        visible={visibility}
        onClose={() => setVisibility(!visibility)}
      /> */}
    </div>
  );
};

export default MainLayout;
