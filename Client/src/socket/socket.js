import { io } from "socket.io-client";

export const socket = io("http://localhost:9000", {
  autoConnect: true, // https://madhur-dairy-daily-need-server.onrender.com
});

