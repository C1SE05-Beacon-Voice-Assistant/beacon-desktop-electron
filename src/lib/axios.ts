import Axios from "axios";

const axios = Axios.create({
  baseURL: process.env.BACKEND_URL || "https://api.beacon.id.vn",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axios;
