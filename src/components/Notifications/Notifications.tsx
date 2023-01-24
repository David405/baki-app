import "./Notifications.css";
import React, { FC, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

interface NotificationProps {
  visible: Boolean;
  onClose: any;
}
const Notifications: FC<NotificationProps> = ({ visible, onClose }) => {
  const [viewing, setViewing] = useState<boolean>(false);
  const close = () => {
    onClose();
    setViewing(false);
  };
  if (!visible) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-end items-center">
      {viewing && (
        <div className="w-full view-notifications">
          <div className="notification-body">
            <div className="vn-header">
              <p>View Notification</p>
              <button onClick={() => setViewing(false)}>
                <AiOutlineClose size={20} color="#000" />
              </button>
            </div>
            <div className="vn-body">
              <h2>
                <b>Welcome to Baki</b>
              </h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptas, in dolor consequuntur voluptatibus, aliquid iure,
                corrupti impedit recusandae beatae quos explicabo nisi debitis
                odio quasi nesciunt dolores ipsam maxime. Laborum, obcaecati
                minima. Est voluptatem, tempore corrupti nulla vel quia vero
                officia magni autem, unde maxime, repellat nisi quasi
                accusantium error! Vero non incidunt animi impedit tempore.
                Atque rerum a iusto numquam, iste, dicta aliquid mollitia
                dolorum minima quaerat ea aperiam tenetur! Quas quasi aperiam
                soluta! Laborum, ratione quaerat! Esse facilis tempora quaerat
                ducimus totam quod fugiat, eaque qui aliquid assumenda eos.
                Corrupti dolore nesciunt molestias deleniti quaerat mollitia
                consequatur voluptas ratione non beatae nobis aut error nemo
                eligendi corporis itaque autem esse voluptatem, deserunt quia
                modi rem. Doloribus, fugit illum ex fugiat quaerat iure optio,
                culpa facere quod eligendi architecto quia, officia nihil. Nam
                incidunt, ipsum quaerat libero nobis nulla, odio repudiandae
                necessitatibus modi dolore reiciendis officiis, optio quis atque
                doloribus similique ab error veritatis magni nostrum aspernatur
                accusantium illum quo? Obcaecati pariatur velit aperiam eum!
                Magnam sequi est accusamus sit? Deleniti eius fugiat voluptatem
                quas! Minima odit harum similique. Voluptatibus voluptatem
                quisquam aliquam ad consectetur facilis, vel nam deserunt,
                perferendis officiis aliquid iure, corrupti reprehenderit labore
                aspernatur voluptate nobis.
              </p>
            </div>
          </div>
        </div>
      )}
      <div className="bg-dark-blue h-full notifications">
        <div className="flex justify-between notifications-header">
          <div className="flex">
            <p className="font-bold">Notifications</p>
            <button className="text-blue-400 ml-3">Clear</button>
          </div>
          <button onClick={close}>
            <AiOutlineClose size={20} color="#fff" />
          </button>
        </div>
        <div
          className="py-3 pl-2 notification"
          onClick={() => setViewing(true)}
        >
          <p className="font-bold">Welcome to Baki</p>
          <p className="text-xs">Infinite liquidity provider</p>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
