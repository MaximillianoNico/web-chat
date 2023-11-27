import { io } from "socket.io-client";

const Websocket = (() => {
  return io(
    "ws://localhost:8080",
    {
      reconnectionDelayMax: 10000
    }
  );
})();

export default Websocket;
