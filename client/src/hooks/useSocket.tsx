import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

const SOCKET_SERVER_URL = import.meta.env.VITE_API_SERVER_URL ?? "";

if (!SOCKET_SERVER_URL) {
  throw new Error("Socket server url not provided");
}

const useSocket = (queryOptions: object) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketIo = io(SOCKET_SERVER_URL, queryOptions);

    setSocket(socketIo);

    return () => {
      socketIo.disconnect();
    };
  }, [queryOptions]);

  return socket;
};

export default useSocket;