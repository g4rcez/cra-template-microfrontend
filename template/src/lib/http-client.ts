import { useAxios } from "hulks";
import axios from "axios";
import axiosRetry from "axios-retry";

export const Endpoints = {
  logout: "/api/auth/logout",
  userInfo: "/api/auth/userInfo",
};

const instance = axios.create({
  httpAgent: "APP_NAME",
  httpsAgent: "APP_NAME",
  timeout: Number.MAX_SAFE_INTEGER,
});

axiosRetry(instance, {
  retries: 3,
  retryDelay: (retryCount) => retryCount * 1000,
});

export const httpClient = instance;

export const useHttpClient = () => useAxios(instance);
