import axios from "axios";

const api = axios.create({
  // baseURL: "https://madhur-dairy-daily-need-server.onrender.com",
  // baseURL: "https://madhur-dairy-daily-need-server-1eu6.onrender.com"
  baseURL: "http://localhost:9000"
});

export default api;