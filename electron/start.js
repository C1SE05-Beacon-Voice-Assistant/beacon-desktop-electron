/* eslint-disable @typescript-eslint/no-var-requires */
const os = require("os");
const axios = require("axios");
const { machineIdSync } = require("node-machine-id");

const instance = axios.create({
  baseURL: process.env.BACKEND_URL || "https://api.beacon.id.vn",
});

const mac = machineIdSync({
  original: true,
});

async function isExist() {
  try {
    const response = await instance.get(`/api/users/mac/${mac}`);
    if (response.data) {
      return response.data;
    }

    return false;
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
    name: os.userInfo().username,
    email: "test@test.com",
    dob: "2000-12-25T15:24:14.035Z",
    gender: true,
    MAC: mac,
  };

  try {
    const response = await instance.post("/api/users", data);
    return response.data;
  } catch (error) {
    return error;
  }
}

async function getMAC() {
  return machineIdSync({
    original: true,
  });
}

module.exports = { isExist, register, getMAC, instance };
