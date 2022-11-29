import React, { FC, useState } from "react";
import home from "../assets/home.png";
import homedark from "../assets/home-dark.png";
import mint from "../assets/mint.png";
import mintdark from "../assets/mint-dark.png";
import swap from "../assets/swap.png";
import swapdark from "../assets/swap-dark.png";
import team from "../assets/team.png";
import teamdark from "../assets/team-dark.png";
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
import avax from "../assets/avax.png";
import celo from "../assets/celo.png";
import { useCelo } from "@celo/react-celo";

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
  const { connect, address, network, updateNetwork, networks, disconnect } =
    useCelo();

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
          <Link to="/app">
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
          </Link>
          <Link to="/app/mint">
            <div
              className={`layout-route flex p-2 ${
                location.pathname === "/app/mint" && "route-active"
              }`}
              onMouseEnter={() => setRoute("mint")}
              onMouseLeave={() => setRoute("")}
            >
              <img
                src={
                  route === "mint" || location.pathname === "/app/mint"
                    ? mintdark
                    : mint
                }
                alt=""
              />
              <p className="ml-2 ">My Position</p>
            </div>
          </Link>
          <Link to="/app/swap">
            <div
              className={`layout-route flex p-2 ${
                location.pathname === "/app/swap" && "route-active"
              }`}
              onMouseEnter={() => setRoute("swap")}
              onMouseLeave={() => setRoute("")}
            >
              <img
                src={
                  route === "swap" || location.pathname === "/app/swap"
                    ? swapdark
                    : swap
                }
                alt=""
              />
              <p className="ml-2 ">Swap</p>
            </div>
          </Link>
          <Link to="/app/liquidation">
            <div
              className={`layout-route flex p-2 ${
                location.pathname === "/app/liquidation" && "route-active"
              }`}
              onMouseEnter={() => setRoute("liquidation")}
              onMouseLeave={() => setRoute("")}
            >
              <img
                src={
                  route === "liquidation" ||
                  location.pathname === "/app/liquidation"
                    ? liquidatedark
                    : liquidate
                }
                alt=""
              />
              <p className="ml-2 ">Liquidation</p>
            </div>
          </Link>
          <Link to="/app/transactions">
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
          </Link>
        </div>
        <div className="sidebar-footer flex justify-center items-center">
          <Link to="/">
            <img src={bakifooter} alt="logo" />
          </Link>
        </div>
      </div>
      <div className="flex-1 h-screen">
        <div className="flex justify-between p-5 ">
          {!isTabletOrMobile && (
            <div className=" relatively ml-3">
              <h1 className="font-bold text-lg">
                {location.pathname === "/app" && "Hi there"}
                {location.pathname === "/app/mint" && "My Position"}
                {location.pathname === "/app/swap" && "Swap"}
                {location.pathname === "/app/liquidation" && "Liquidation"}
                {location.pathname === "/app/transactions" && "Transactions"}
              </h1>
              <p className="text-font-grey">
                {location.pathname === "/app" && "Explore your dashboard"}
                {location.pathname === "/app/mint" &&
                  "Select the asset you’d like to deposit"}
                {location.pathname === "/app/swap" && "Access Synthetic Assets"}
                {location.pathname === "/app/liquidation" &&
                  "Provide Liquidation"}
                {location.pathname === "/app/transactions" &&
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
              <div className="absolute bg-red-600 rounded-full h-3 w-3 flex justify-center items-center text-white ml-3">
                <p className="text-xs">1</p>
              </div>
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
                    {network.name === "Avalanche" && (
                      <img src={avax} alt="avax" className="h-6" />
                    )}
                    {network.name === "Celo" && (
                      <img src={celo} alt="celo" className="h-6" />
                    )}

                    <p className="ml-1">{network.name}</p>
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
                  {networks.map(network => (
                    <div
                      className="flex p-2 mb-2 network"
                      onClick={() => updateNetwork(network)}
                    >
                      <p className="ml-2">{network.name}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={() => (address ? disconnect() : connect())}
              className="text-white bg-dark-orange rounded-full font-bold p-2  mr-2 "
            >
              {address ? "Disconnect" : "Connect Wallet"}
            </button>
          </div>
        </div>
        <div className="p-4  layout-body">{children}</div>
      </div>

      <Notifications
        visible={viewNotifications}
        onClose={setViewNotifications}
      />
    </div>
  );
};

export default MainLayout;
