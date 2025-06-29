import axios from "axios";

const api = axios.create({
    baseURL: "https://madhur-dairy-daily-need-server.onrender.com",
});

export default api;