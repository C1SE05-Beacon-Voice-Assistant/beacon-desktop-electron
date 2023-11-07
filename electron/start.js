/* eslint-disable @typescript-eslint/no-var-requires */
require("dotenv").config();
const axios = require("axios");
const { machineIdSync } = require("node-machine-id");

axios.defaults.baseURL = process.env.API_URL;
const mac = machineIdSync({
  original: true,
});

async function start() {
  try {
    const { data } = await axios.get(`/users/mac/${mac}`);
    if (data) return;
    else return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function register(userInfo) {
  const data = {
    ...userInfo,
    MAC: mac,
  };

  try {
    const response = await axios.post("/users", data);
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
