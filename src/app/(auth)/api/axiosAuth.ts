import axios from "axios";

export const axiosAuth = axios.create({
  baseURL: process.env["NEXT_PUBLIC_BASE_URL"],
  method: "POST",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
