/* eslint-disable @typescript-eslint/no-var-requires */
const axios = require("axios");
const { machineIdSync } = require("node-machine-id");

const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? process.env.API_URL || "http://api.beacon.id.vn/api"
      : "http://localhost:8000/api",
});

const mac = machineIdSync({
  original: true,
});

async function start() {
  try {
    const response = await instance.get(`/users/mac/${mac}`);
    return true;
  } catch (err) {
    if (err.response && err.response.status === 404) {
      return false;
    }
    // Handle other error cases here if needed.
  }
}

async function register(userInfo) {
  const data = {
    ...userInfo,
    email: "test@test.com",
    dob: "2000-12-25T15:24:14.035Z",
    gender: true,
    MAC: mac,
  };

  try {
    const response = await instance.post("/users", data);
    return response.data;
  } catch (error) {
    return error;
  }
}

// register({
//   name: "test",
//   email: "test@test.com",
//   dob: "2023-11-04T15:24:14.035Z",
//   gender: true,
//   phone: "0123456789",
// })
//   .then((res) => {
//     console.log("pass", res);
//   })
//   .catch((err) => {
//     console.log("fail", err);
//   });

module.exports = { start, register };
