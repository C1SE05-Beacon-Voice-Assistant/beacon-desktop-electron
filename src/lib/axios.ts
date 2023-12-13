import Axios from "axios";

const axios = Axios.create({
  baseURL: process.env.BACKEND_URL || "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axios;
