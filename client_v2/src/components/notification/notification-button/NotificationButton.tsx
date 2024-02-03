import { useEffect, useState } from "react";
import ButtonLight from "../../button/button-light/ButtonLight";
import { useSocket } from "../../../context/SocketContext";

const NotificationButton = () => {
  const [totalNotifications, setTotalNotifications] = useState<number>(0);
  const { socket } = useSocket();

  useEffect(() => {
    if (socket) {
      socket.on("new-notification", (notification: Notification) => {
        setTotalNotifications((curr) => curr + 1);
      });
    }

    return () => {
      if (socket) {
        socket.off("new-notification");
      }
    };
  }, [socket]);

  return (
    <ButtonLight size="w-9 h-9 flex justify-center items-center" hideUnerline>
      <div className="relative">
        <i className="fa-regular fa-bell fa-lg"></i>
        {totalNotifications > 0 ? (
          <span className="w-4 h-4 bg-red-500 flex justify-center items-center absolute top-0 right-0">
            {totalNotifications}
          </span>
        ) : null}
      </div>
    </ButtonLight>
  );
};

export default NotificationButton;
