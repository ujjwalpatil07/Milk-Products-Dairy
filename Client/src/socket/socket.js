import { io } from "socket.io-client";

export const socket = io("https://madhur-dairy-daily-need-server.onrender.com", {
  autoConnect: true,
});


