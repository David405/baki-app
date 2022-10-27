import React, { FC } from "react";
import "./ConnectWallet.css";
import metamask from "../../assets/metamask.png";
import walletconnect from "../../assets/walletconnect.png";
import { AiOutlineClose } from "react-icons/ai";

interface ConnectWalletProps {
  visible: Boolean;
  onClose: any;
}

const ConnectWallet: FC<ConnectWalletProps> = ({ visible, onClose }) => {
  if (!visible) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <button onClick={() => onClose(false)} className="close-modal">
        <AiOutlineClose size={24} />
      </button>
      <div className="bg-white modal-body rounded-md w-4/12  h-1/5 flex justify-center items-center">
        <button className="flex flex-col justify-center items-center text-font-grey text-sm p-4 cursor-pointer">
          <img src={metamask} alt="Metamask" />
          <p
            style={{
              color: "#ccc",
            }}
            className="mt-2 text-center"
          >
            Connect with Metamask to connect
          </p>
        </button>
        <button className="flex flex-col justify-center items-center text-font-grey text-sm p-4 connect cursor-pointer">
          <img src={walletconnect} alt="Wallet Connect" />
          <p
            style={{
              color: "#ccc",
            }}
            className="mt-2 text-center"
          >
            Connect with WalletConnect to connect
          </p>
        </button>
      </div>
    </div>
  );
};

export default ConnectWallet;
