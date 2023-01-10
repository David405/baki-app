import "./Notifications.css";
import React, { FC } from "react";
import { AiOutlineClose } from "react-icons/ai";

interface NotificationProps {
  visible: Boolean;
  onClose: any;
}
const Notifications: FC<NotificationProps> = ({ visible, onClose }) => {
  if (!visible) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-end items-center">
      <div className="bg-dark-blue h-full notifications">
        <div className="flex justify-between notifications-header">
          <div className="flex">
            <p className="font-bold">Notifications</p>
            <button className="text-blue-400 ml-3">Clear</button>
          </div>
          <button onClick={() => onClose(false)}>
            <AiOutlineClose size={20} color="#fff" />
          </button>
        </div>

        <div className="py-3 pl-2 notification">
          <p className="font-bold">Welcome to Baki</p>
          <p className="text-xs">Infinite liquidity provider</p>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
