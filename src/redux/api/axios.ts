import axios from "axios";

export const axiosPrivate = axios.create({
  baseURL: "http://192.168.1.11:5148/api/user",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
